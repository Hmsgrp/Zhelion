using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class PrescribeTestResult
    {
        public string testId { get; set; }
        public string patientId { get; set; }
        public long outMobileNo { get; set; }
        public string hospId { get; set; }
        public string doctorId { get; set; }
    }
}
