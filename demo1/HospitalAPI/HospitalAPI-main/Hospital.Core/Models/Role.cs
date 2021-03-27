using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System;

namespace Hospital.Core.Models
{
    public class Role
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string RoleId { get; set; }
        [Required(ErrorMessage = "Please enter Role Name.")]
        [MinLength(5, ErrorMessage = "Role Name should have min 5 characters")]
        [MaxLength(15, ErrorMessage = "Role Name should have max 15 characters")]
        public string RoleName { get; set; }
        [Required(ErrorMessage = "Please enter Role Description.")]
        public string RoleDescription { get; set; }
        public bool IsActive { get; set; }
        public DateTime  CreatedDate { get; set; }
    }
}
