using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;
using Newtonsoft.Json;
using SigningServer.Shared;

namespace SigningServer.Domain.Models
{
    [Table("dbo.Documents")]
    public class DocumentModel
    {
        [ExplicitKey]
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? SignDate { get; set; }
        public int Status { get; set; }
        [Write(false)]
        public DocumentStatus StatusTyped
        {
            get { return (DocumentStatus)Status; }
            set { Status = (int)value; }
        }
        public string Data { get; set; }

        [Write(false)]
        public Document1C DocumentParsed
        {
            get { return JsonConvert.DeserializeObject<Document1C>(Data); }
        }
    }
}
