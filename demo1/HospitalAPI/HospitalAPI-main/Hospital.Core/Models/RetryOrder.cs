using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class RetryOrder
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Id { get; set; }

        public int RetryCount { get; set; }

        public string OrderId { get; set; }

        public string RetryOrderID { get; set; }
    }
}
