using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;
using SigningServer.Shared;

namespace SigningServer.Domain.Models
{
    public class UserModel
    {
        [ExplicitKey]
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public string Login { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string Role { get; set; }

        [Write(false)] public UserRole RoleTyped => Enum.Parse<UserRole>(Role, true);


    }
}
