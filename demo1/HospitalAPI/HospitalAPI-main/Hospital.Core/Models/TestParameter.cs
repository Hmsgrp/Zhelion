using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class TestParameter
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string TestParameterId { get; set; }
        public string TestId { get; set; }
        public string ParameterName { get; set; }
        public decimal RangesFrom { get; set; }
        public decimal RangesTo { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
