using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SigningServer.Core.Responses;

namespace SigningServer.Api.Controllers
{
    [Produces("application/json")]
    [Route("[Controller]")]
    public class TestController: Controller
    {
        [HttpGet]
        [Route("Get")]
        public async Task<BaseResponse> GetUserInfo()
        {
            return new UserInfoResponse()
            {
                Name = "V",
                Surname = "Hrenov",
                Role = "Director"
            };
        }
    }
}
