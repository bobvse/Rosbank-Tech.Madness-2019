using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SigningServer.Core.Mappers;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;
using SigningServer.Domain;
using SigningServer.Domain.Extensions;

namespace SigningServer.Core.Commands
{
    public class GetDocumentsCommand: IBaseCommand<GetDocumentsRequest, GetDocumentsResponse>
    {
        public SigningDocsRepository _repository;
        private DocumentMapper _documentMapper;

        public GetDocumentsCommand(SigningDocsRepository repository, DocumentMapper documentMapper)
        {
            _repository = repository;
            _documentMapper = documentMapper;
        }

        public GetDocumentsResponse Execute(GetDocumentsRequest request)
        {
            var user = _repository.GetUser(request.UserLogin);
            if (user == null)
            {
                return new GetDocumentsResponse() { Error = $"Cannot find user {request.UserLogin}" };
            }

            var documentsRows = user.IsOperator() ?
                _repository.GetUserDocuments(user.Id) :
                _repository.GetDocumentsForSigning(user.CompanyId);
            var documents = documentsRows.Select(doc => _documentMapper.Map(doc)).ToList();
            return new GetDocumentsResponse()
            {
                Success = true,
                Documents = documents
            };
        }
    }
}
