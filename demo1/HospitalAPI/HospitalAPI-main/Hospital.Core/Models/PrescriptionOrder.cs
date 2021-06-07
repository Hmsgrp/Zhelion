using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PrescriptionOrder
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string PrescriptionId { get; set; }

        public string OrderId { get; set; }

        public string HospitalId { get; set; }

        public string PrescribedBy { get; set; }

        public string PatientId { get; set; }

        public DateTime CreatedTime { get; set; }

        public string Hospital_PID { get; set; }

        public string TestId { get; set; }

        public Int32 NoOfTest { get; set; }

        public bool IsPaid { get; set; }

        public string PaymentReferenceNumber { get; set; }

        public DateTime ModifiedOn { get; set; }

        public DateTime PaymentDate { get; set; }

        public string PaymentStatus { get; set; }

        public bool IsSplitPaymentDone { get; set; }

        public DateTime SplitPaymentDateTime { get; set; }

        public string SplitPaymentStatus { get; set; }

        public decimal TotalAmount { get; set; }
    }
}
