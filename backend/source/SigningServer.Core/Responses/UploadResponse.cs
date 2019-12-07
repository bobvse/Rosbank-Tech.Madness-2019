using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Shared;

namespace SigningServer.Core.Responses
{
    public class UploadResponse: BaseResponse
    {
        public List<Document> UploadedDocuments { get; set; }
    }
}
