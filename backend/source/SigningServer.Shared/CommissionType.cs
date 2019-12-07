using System;
using System.Collections.Generic;
using System.Text;

namespace SigningServer.Shared
{
    public class CommissionType
    {
        public decimal? Percent { get; set; }
        public decimal? Amount { get; set; }
        public decimal? MinCommission { get; set; }
        public decimal? MaxCommission { get; set; }
    }
}
