using System;
using System.Collections.Generic;

namespace Hospital.Core.Models
{
    public class UserHospitalMapResult
    {
        public string UserHospitalMapID { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<Hospitals> HospitalInfo { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
