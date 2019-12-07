using System;
using System.Collections.Generic;
using System.Text;
using SigningServer.Core.Requests;
using SigningServer.Core.Responses;
using SigningServer.Domain;

namespace SigningServer.Core.Commands
{
    public class UserInfoCommand: IBaseCommand<UserInfoRequest, UserInfoResponse>
    {
        public SigningDocsRepository _repository;

        public UserInfoCommand(SigningDocsRepository repository)
        {
            _repository = repository;
        }
        public UserInfoResponse Execute(UserInfoRequest request)
        {
            var user = _repository.GetUser(request.UserLogin);
            if (user == null)
            {
                return new UserInfoResponse() {Success = false, Error = $"Cannot find user {request.UserLogin}" };
            }

            var response = new UserInfoResponse()
            {
                Login = user.Login,
                Role = user.Role,
                Name = user.Name,
                Surname = user.Surname,
                Patronymic = user.Patronymic,
                CompanyId = user.CompanyId,
                Success = true
            };

            return response;
        }
    }
}
