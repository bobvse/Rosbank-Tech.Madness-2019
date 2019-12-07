using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Requests
{
    public class GetDocumentsRequest
    {
        public string UserLogin { get; set; }
        public Guid? DocumentId { get; set; }
    }
}
