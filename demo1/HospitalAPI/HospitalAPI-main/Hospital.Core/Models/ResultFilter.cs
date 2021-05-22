using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class ResultFilter
    {
        public string LabId { get; set; }

        public string TestId { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string PatientID { get; set; }

        public string HospitalName { get; set; }

        public string ReferredBy { get; set; }

        public string HospitalID { get; set; }

        public string HPID { get; set; }
    }
}
