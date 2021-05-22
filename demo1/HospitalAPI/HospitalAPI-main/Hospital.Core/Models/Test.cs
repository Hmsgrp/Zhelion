using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class Test
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string TestId { get; set; }
        public string TestName { get; set; }
        public string TestDescription { get; set; }
        public decimal Amount { get; set; }
        public string Unit { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
