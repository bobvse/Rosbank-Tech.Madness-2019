using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using SigningServer.Domain.Models;
using SigningServer.Shared;

namespace SigningServer.Core.Mappers
{
    public class DocumentMapper: IMapper<DocumentModel, Document>
    {
        public Document Map(DocumentModel i)
        {
            var details = i.DocumentParsed;
            return new Document
            {
                Id = i.Id,
                CompanyId = i.CompanyId,
                CreatorId = i.CreatorId,
                CreateDate = i.CreateDate,
                Name = details.CstmrCdtTrfInitn.GrpHdr.MsgId,
                Details = JsonConvert.DeserializeObject<Document1C>(i.Data),
                SignDate = i.SignDate,
                Status = i.StatusTyped.ToString()
            };
        }
    }
}
