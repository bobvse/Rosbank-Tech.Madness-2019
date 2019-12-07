using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Responses
{
    public class CompanyInfoResponse: BaseResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
    }
}
