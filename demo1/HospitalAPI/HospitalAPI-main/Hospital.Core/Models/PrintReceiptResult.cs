using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PrintReceiptResult
    {
        public string PatientName { get; set; }
        public string TestName { get; set; }
        public string OrderID { get; set; }
        public string PaymentReferenceNo { get; set; }
        public int NoOfTest { get; set; }
        public Decimal AmountPaid { get; set; }

    }
}
