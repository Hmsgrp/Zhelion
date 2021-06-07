using Hospital.Core.Models;
using System.Collections.Generic;

namespace Hospital.Core.Services
{
    public class OrderStatus
    {
        public string OrderId { get; set; }

        public bool IsPaid { get; set; }

        public string ReferenceNumber { get; set; }

        public int NoOfResultAdded { get; set; }

        public int TotalNumberOfResult { get; set; }

        public string TestID { get; set; }
        public string TestUnit { get; set; }
        public string PatientId { get; set; }

        public string Hospital_PId { get; set; }

        public List<TestParameterResult> ParameterList { get; set; }

        public string TestName { get; set; }
        public Result Result { get; set; }
    }
}