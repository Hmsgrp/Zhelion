using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class DoctorReferResult
    {
        public User user { get; set; }
        public List<UserHospitalMapResult> userHospitalMapResults { get; set; }
    }
}
