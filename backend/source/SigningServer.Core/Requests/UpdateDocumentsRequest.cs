using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Shared;

namespace SigningServer.Core.Requests
{
    public class UpdateDocumentsRequest
    {
        public string UserLogin { get; set; }
        public List<Document> Documents { get; set; }
    }
}
