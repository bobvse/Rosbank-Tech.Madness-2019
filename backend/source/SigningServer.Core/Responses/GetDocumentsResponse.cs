using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Shared;

namespace SigningServer.Core.Responses
{
    public class GetDocumentsResponse: BaseResponse
    {
        public List<Document> Documents { get; set; }
    }
}
