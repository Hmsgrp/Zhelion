using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PaymentHistory
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string PaymentHistoryId { get; set; }
        public string OrderId { get; set; }
        public object ResponseJson { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
