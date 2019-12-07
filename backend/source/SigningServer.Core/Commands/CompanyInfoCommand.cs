using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;
using SigningServer.Domain;

namespace SigningServer.Core.Commands
{
    public class CompanyInfoCommand : IBaseCommand<CompanyInfoRequest, CompanyInfoResponse>
    {
        public SigningDocsRepository _repository;

        public CompanyInfoCommand(SigningDocsRepository repository)
        {
            _repository = repository;
        }
        public CompanyInfoResponse Execute(CompanyInfoRequest request)
        {
            var company = _repository.GetCompany(request.CompanyId);
            if (company == null)
            {
                return new CompanyInfoResponse() { Success = false, Error = $"Company '{request.CompanyId}' not found" };
            }

            var response = new CompanyInfoResponse
            {
                Id = company.Id,
                Name = company.Name,
                Balance = company.Balance,
                Success = true
            };

            return response;
        }
    }
}
