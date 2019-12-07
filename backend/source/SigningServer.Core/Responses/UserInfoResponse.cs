using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using SigningServer.Core.Types;
using SigningServer.Shared;

namespace SigningServer.Core.Responses
{
    public class UserInfoResponse: BaseResponse
    {
        public string Login { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Role { get; set; }
        public Guid CompanyId { get; set; }
    }
}
