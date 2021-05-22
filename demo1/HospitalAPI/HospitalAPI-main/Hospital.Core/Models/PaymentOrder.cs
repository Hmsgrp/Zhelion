using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PaymentOrder
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string PaymentOrderId { get; set; }
        public string OrderId { get; set; }
        public string TestId { get; set; }
        public string PatientId { get; set; }
        public string PaymentRefNo { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

    }
}
