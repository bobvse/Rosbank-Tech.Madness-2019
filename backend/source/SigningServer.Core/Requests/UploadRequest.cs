using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Core.Requests
{
    public class UploadRequest
    {
        public string UserLogin { get; set; }
        public List<byte[]> Files { get; set; }
    }
}
