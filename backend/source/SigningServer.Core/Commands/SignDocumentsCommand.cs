using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;
using SigningServer.Domain;
using SigningServer.Domain.Extensions;

namespace SigningServer.Core.Commands
{
    public class SignDocumentsCommand: IBaseCommand<SignDocumentsRequest, SignDocumentsResponse>
    {
        public SigningDocsRepository _repository;

        public SignDocumentsCommand(SigningDocsRepository repository)
        {
            _repository = repository;
        }
        public SignDocumentsResponse Execute(SignDocumentsRequest request)
        {
            var user = _repository.GetUser(request.UserLogin);
            if (user == null)
            {
                return new SignDocumentsResponse() { Error = "user not found", Success = false };
            }

            if (!user.IsDirector())
            {
                throw new UnauthorizedAccessException($"User {request.UserLogin} unauthorized call this method");
            }

            var documentIds = request.DocumentIds;
            var processingDocuments = _repository.GetDocumentsForSigning(user.CompanyId);
            var processingDocumentIds = new HashSet<Guid>(processingDocuments.Select(d => d.Id));

            if (documentIds.Any(id => !processingDocumentIds.Contains(id)))
            {
                return new SignDocumentsResponse() { Success = false, Error = "Invalid documentIds list"};
            }
            
            _repository.SignDocuments(request.DocumentIds);
            return new SignDocumentsResponse() {Success = true};
        }
    }
}
