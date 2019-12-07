using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using SigningServer.Core.Parsers;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;
using SigningServer.Domain;
using SigningServer.Domain.Models;
using SigningServer.Shared;
using Document = SigningServer.Shared.Document;

namespace SigningServer.Core.Commands
{
    public class UploadDocumentsCommand: IBaseCommand<UploadRequest, UploadResponse>
    {
        private SigningDocsRepository _repository;
        private DocumentParser _documentParser;
        public UploadDocumentsCommand(SigningDocsRepository repository, DocumentParser documentParser)
        {
            _repository = repository;
            _documentParser = documentParser;
        }

        public UploadResponse Execute(UploadRequest request)
        {
            var user = _repository.GetUser(request.UserLogin);

            var documentModels = request.Files.Select(i =>
            {
                var doc = _documentParser.Parse(i);

                return new DocumentModel
                {
                    CompanyId = user.CompanyId,
                    CreateDate = DateTime.Now,
                    CreatorId = user.Id,
                    Id = Guid.NewGuid(),
                    SignDate = null,
                    StatusTyped = DocumentStatus.New,
                    
                    Data = JsonConvert.SerializeObject(doc)
                };
            }).ToList();
            _repository.AddDocuments(documentModels);
            var documents = documentModels.Select(i =>
            {
                var doc = i.DocumentParsed;
                return new Document
                {
                    Id = i.Id,
                    CompanyId = i.CompanyId,
                    CreatorId = i.CreatorId,
                    CreateDate = i.CreateDate,
                    Name = doc.CstmrCdtTrfInitn.GrpHdr.MsgId,
                    SignDate = i.SignDate,
                    Status = i.StatusTyped.ToString(),
                    Details = i.DocumentParsed
                };
            }).ToList();
            return new UploadResponse() { Success = true, UploadedDocuments = documents };
        }
    }
}
