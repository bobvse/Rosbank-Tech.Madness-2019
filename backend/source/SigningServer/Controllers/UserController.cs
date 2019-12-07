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
    public class UserController: Controller
    {
        private UserInfoCommand _userInfoCommand;

        public UserController(UserInfoCommand userInfoCommand)
        {
            _userInfoCommand = userInfoCommand;
        }

        [HttpGet]
        [Route("{user}")]
        public async Task<BaseResponse> GetAsync([FromRoute] string user)
        {
            var request = new UserInfoRequest(user);
            var response = _userInfoCommand.Execute(request);
            return response;
        }
    }
}
