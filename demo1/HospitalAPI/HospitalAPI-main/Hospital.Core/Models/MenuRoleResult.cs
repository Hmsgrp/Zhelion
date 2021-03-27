using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class MenuRoleMapResult
    {
        public string MappingId { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        //public string MenuId { get; set; }
        //public string MenuName { get; set; }
        public List<MenuResult> MenuInfo { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
