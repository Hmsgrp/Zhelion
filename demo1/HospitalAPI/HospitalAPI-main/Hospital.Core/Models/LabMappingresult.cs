using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class LabMappingresult
    {
        public string LabId { get; set; }
        public string HospitalID { get; set; }
        public string UserId { get; set; }
        public string LabName { get; set; }
        public string LabAddress { get; set; }
        public long PhoneNumber { get; set; }
        public long LandlineNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
