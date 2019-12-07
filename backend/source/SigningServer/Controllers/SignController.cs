using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigningServer.Core.Commands;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;

namespace SigningServer.Api.Controllers
{
    [Produces("application/json")]
    [Route("[Controller]")]
    public class SignController : Controller
    {
        private SignDocumentsCommand _signDocumentsCommand;

        public SignController(SignDocumentsCommand signDocumentsCommand)
        {
            _signDocumentsCommand = signDocumentsCommand;
        }

        [HttpPost]
        [Route("{user}")]
        public async Task<SignDocumentsResponse> GetAsync([FromRoute] string user, [FromBody] SignDocumentsRequest request)
        {
            request.UserLogin = user;
            var response = _signDocumentsCommand.Execute(request);
            return response;
        }
    }
}
