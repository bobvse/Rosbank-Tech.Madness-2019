using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace SigningServer.Domain.Models
{
    [Table("dbo.Roles")]
    public class RoleModel
    {
        [ExplicitKey]
        public string Id { get; set; }
        public string Description { get; set; }
    }
}
