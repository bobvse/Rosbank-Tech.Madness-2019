using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;
using SigningServer.Domain;

namespace SigningServer.Core.Commands
{
    public class UpdateDocumentsCommand : IBaseCommand<UpdateDocumentsRequest, UpdateDocumentsResponse>
    {
        public SigningDocsRepository _repository;

        public UpdateDocumentsCommand(SigningDocsRepository repository)
        {
            _repository = repository;
        }

        public UpdateDocumentsResponse Execute(UpdateDocumentsRequest request)
        {
            var docs = request.Documents;

            foreach (var doc in docs)
            {
                var dbDoc = _repository.GetDocument(doc.Id);
                dbDoc.StatusTyped = doc.StatusTyped;
                _repository.UpdateDocument(dbDoc);
            }

            return new UpdateDocumentsResponse() { Success = true };
        }
    }
}
