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
    public class CompanyController : Controller
    {
        private CompanyInfoCommand _companyInfoCommand;

        public CompanyController(CompanyInfoCommand companyInfoCommand)
        {
            _companyInfoCommand = companyInfoCommand;
        }

        [HttpGet]
        [Route("{companyId}")]
        public async Task<BaseResponse> GetAsync([FromRoute] Guid companyId)
        {
            var request = new CompanyInfoRequest(companyId);
            var response = _companyInfoCommand.Execute(request);
            return response;
        }
    }
}
