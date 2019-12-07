using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Requests
{
    public class SignDocumentsRequest: BaseRequest
    {
        public string UserLogin { get; set; }
        public List<Guid> DocumentIds { get; set; }
    }
}
