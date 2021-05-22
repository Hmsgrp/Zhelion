using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class LabMapping
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string LabMappingId { get; set; }
        public string LabID { get; set; }
        public string HospitalID { get; set; }
        public bool IsActive { get; set; }
    }
}
