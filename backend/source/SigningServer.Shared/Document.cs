using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace SigningServer.Shared
{
    public class Document
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? SignDate { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public Document1C Details { get; set; }

        [JsonIgnore]
        public DocumentStatus StatusTyped
        {
            get { return Enum.Parse<DocumentStatus>(Status); }
            set { Status = value.ToString(); }
        }
    }
}
