using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Hospital.Core.Models
{
    public class Hospitaal
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string HospitalId { get; set; }
        [Required(ErrorMessage = "Please enter Hospital Name.")]
        public string HospitalName { get; set; }
        [Required(ErrorMessage = "Please enter Role Description.")]
        [DataType(DataType.MultilineText)]
        public string HospitalAddress { get; set; }
        public string ContactPerson { get; set; }
        public long PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
