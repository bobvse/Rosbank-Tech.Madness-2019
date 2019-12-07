using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using NLog;
using SigningServer.Core.Responses;

namespace SigningServer.Middlewares
{
    public class RequestMiddleWare
    {
        private ILogger _logger;

        private readonly RequestDelegate _next;

        public RequestMiddleWare(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                try
                {
                    context.Response.Headers.TryAdd("Access-Control-Allow-Origin", "*");
                }
                catch
                {
                }

                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected

            if (exception is UnauthorizedAccessException) code = HttpStatusCode.Unauthorized;


            //if (exception is PolicyNotFoundExeption) code = HttpStatusCode.BadRequest;

            _logger = LogManager.GetCurrentClassLogger();

            _logger.Error(exception);



            var result = JsonConvert.SerializeObject(new BaseResponse { Success = false, Error = exception.ToString()/*Message*/ });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }

    }
}