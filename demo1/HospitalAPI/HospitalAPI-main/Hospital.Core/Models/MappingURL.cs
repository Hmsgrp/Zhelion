using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class MappingURL
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string MappingURLId { get; set; }

        public string UserID { get; set; }

        public string HospitalID { get; set; }

        public string SalesRefID { get; set; }

        public bool IsDoctor { get; set; }

        public string MobileNumber { get; set; }

        public string URLGenerated { get; set; }

        public string RediectionLink { get; set; }

        public bool IsActive { get; set; }

        public string CreatedDateTime { get; set; }
    }
}
