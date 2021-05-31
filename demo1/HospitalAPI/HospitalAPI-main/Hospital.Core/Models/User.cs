using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Hospital.Core.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string UserID { get; set; }
        public string UserName { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string HospitalId { get; set; }
        public long MobileNumber { get; set; }
        [DataType(DataType.EmailAddress)]
        public string EmailId { get; set; }
        public string Hospital_PID { get; set; }
        public string FullName { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public DateTime LastPasswordChnged { get; set; }
        public int Otp { get; set; }
        public string RoleId { get; set; }
        public bool IsActive { get; set; }
        public bool IsRegistered { get; set; }
        public string TokenAny { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ReferredBy { get; set; }

        public int DischargeID { get; set; }

        public bool IsDischarged { get; set; }


        public User()
        {
            this.IsActive = true;
            this.IsRegistered = true;
            this.IsDischarged = false;
        }

    }
}
