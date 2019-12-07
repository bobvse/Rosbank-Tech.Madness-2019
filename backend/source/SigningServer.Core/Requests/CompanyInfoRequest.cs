using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Requests
{
    public class CompanyInfoRequest
    {
        public Guid CompanyId { get; set; }

        public CompanyInfoRequest(Guid companyId)
        {
            CompanyId = companyId;
        }
    }
}
