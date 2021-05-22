using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PaymentInitiator
    {
        public string Currency { get; set; }
        public string Amount { get; set; }
        public string OrderId { get; set; }
        public string CustomerId { get; set; }

    }
}
