using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class Menu
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string MenuId { get; set; }
        public string MenuName { get; set; }
        public string MenuLink { get; set; }
        public string MenuDescription { get; set; }
        public bool IsSideBar { get; set; }
        public bool IsDashBoard { get; set; }
        public string MenuType { get; set; }
        public object Icon { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
