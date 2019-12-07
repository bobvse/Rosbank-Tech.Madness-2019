using System;
using System.IO;
using System.Reflection;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using NLog;

namespace SigningServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var logger = LogManager.GetLogger(typeof(Program).FullName);
            try
            {
                BuildWebHost(args).Run();
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Error during start server");
            }
        }

        private static IWebHost BuildWebHost(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location))
                .AddJsonFile("appsettings.json", false, true)
                .AddCommandLine(args)
                .Build();

            return WebHost.CreateDefaultBuilder(args)
                .ConfigureServices(services => services.AddAutofac())
                .UseConfiguration(config)
                .UseUrls("http://*:8080")
                .UseContentRoot(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location))
                .UseStartup<Startup>()
                .Build();
        }
    }
}
