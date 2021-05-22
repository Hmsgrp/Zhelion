using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PaymentHistoryResult
    {
        public PaymentHistory PaymentHistory { get; set; }
        public PrintReceiptResult PrintReceiptResult { get; set; }
    }
}
