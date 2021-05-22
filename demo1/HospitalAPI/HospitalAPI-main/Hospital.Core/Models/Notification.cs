using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class Notification
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string NotificationId { get; set; }

        public string ResultId { get; set; }

        public string Message { get; set; }

        public string UserId { get; set; }

        public bool IsActive { get; set; }

        public bool IsResult { get; set; }

        public string OrderID { get; set; }

        public DateTime CreatedOn { get; set; }
    }

}
