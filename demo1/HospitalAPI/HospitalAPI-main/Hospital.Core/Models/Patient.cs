using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class Patient
    {
        public string PatientID { get;set; }
        public string HospitalID { get; set; }
        public string Hospital_PID { get; set; }
        public string Referredby { get; set; }
        public string Name { get; set; }
    }
}
