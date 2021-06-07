using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class ActiveTestList
    {
        public string TestId { get; set; }

        public Decimal AmountforOneTest { get; set; }

        public Decimal TotalAmount { get; set; }

        public string OrderId { get; set; }

        public string RetryOrderId { get; set; }

        public string HospitalId { get; set; }

        public int NoOfTestSugested { get; set; }
        
        public string TestName { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
