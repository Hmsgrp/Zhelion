using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PaymentSplitUpResult
    {
        public string SplitUpID { get; set; }
        public string TestId { get; set; }
        public string TestName { get; set; }
        public decimal DoctorPercent { get; set; }
        public decimal LabPercent { get; set; }
        public decimal Company { get; set; }
        public DateTime EffectiveFromDate { get; set; }
        public DateTime EffectiveToDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
