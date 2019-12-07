using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Requests
{
    public class UserInfoRequest
    {
        public string UserLogin { get; set; }

        public UserInfoRequest(string userLogin)
        {
            UserLogin = userLogin;
        }
    }
}
