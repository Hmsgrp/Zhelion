using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Hospital.Core.Models
{
    public class TestMap
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string TestMapId { get; set; }
        public string TestId { get; set; }
        public string LabId { get; set; }
        public string DoctorId { get; set; }
        public string Patient_HID { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserId { get; set; }
        public bool IsPaid { get; set; }
        public string ReceiptNo { get; set; }
        public string PaymentRefNo { get; set; }
    }
}
