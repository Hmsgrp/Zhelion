using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class ResultInput
    {
        public string OrderId { get; set; }

        public List<TestParameterResult> JsonResult { get; set; }

        public bool IsOfflinePayment { get; set; }

        public string CashReceiptNumber { get; set; }

        public string ApproverName { get; set; }

        public string userId { get; set; }

        public string PatientName { get; set; }

        public int Age { get; set; }

        public string Sex { get; set; }

        public string PathologicalCondition { get; set; }

        public string SpecimenType { get; set; }

        public string TestMethodUsed { get; set; }

        public string Detailsofspecimenpreparation { get; set; }

        public string Observation { get; set; }

        public string TestDoneBy { get; set; }

        public string ResultStatus { get; set; }

        public string HospitalID { get; set; }
        public int DischargeID { get; set; }
        public string TestApprovedBy { get; set; }
        public string TestCollectedWard { get; set; }
        public DateTime TestReportedDate { get; set; }
        public DateTime TestReceivedDate { get; set; }
    }
}
