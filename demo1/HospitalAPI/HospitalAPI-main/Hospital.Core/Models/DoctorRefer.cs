using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class DoctorRefer
    {
        public User user { get; set; }
        public UserHospitalMap userHospitalMaps { get; set; }
    }
}
