using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;

namespace SigningServer.Domain.Models
{
    [Table("Companies")]
    public class CompanyModel
    {
        [ExplicitKey]
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
    }
}
