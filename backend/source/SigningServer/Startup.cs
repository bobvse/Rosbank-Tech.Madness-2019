using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Autofac;
using SigningServer.DI.Modules;
//using NLog.Extensions.Logging;
using NLog.Web;
using NLog;
using Autofac.Extensions.DependencyInjection;
using Newtonsoft.Json;
using SigningServer.Settings;
using Microsoft.Extensions.DependencyInjection;
using SigningServer.Middlewares;

namespace SigningServer
{

    public class Startup
    {
        private readonly Logger _logger = LogManager.GetLogger("TrainInsurance");
        public SigningServerSettings AppSettings { get; }

        public Startup()
        {
            _logger.Info("Starting web Server...");

            AppSettings = JsonConvert.DeserializeObject<SigningServerSettings>(File.ReadAllText("appsettings.json"))
                ;

            _logger.Info("Server running at ");
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            var builder = new ContainerBuilder();

            builder.Populate(services);

            builder.Build();
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {

            builder.RegisterInstance(AppSettings).SingleInstance();

            builder.RegisterModule(new DataModule(AppSettings));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
            IApplicationLifetime applicationLifetime)
        {
            applicationLifetime.ApplicationStarted.Register(OnStarted);
            applicationLifetime.ApplicationStopping.Register(() => { });
            
            // Настройки NLog
            //env.ConfigureNLog("NLog.config");

            // Настройки логирования
            loggerFactory
                .AddDebug()
                .AddConsole();
                //.AddNLog();

            //loggerFactory.AddNLog();
            //app.AddNLogWeb();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware(typeof(RequestMiddleWare));

            app.UseMvc();
        }

        private void OnStarted()
        {
        }
    }
}

