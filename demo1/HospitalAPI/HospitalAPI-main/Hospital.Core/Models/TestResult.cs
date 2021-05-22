using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class TestResult
    {
        public string ResultID { get; set; }
        public string TestapId { get; set; }
        public string TestParamId { get; set; }
        public decimal TestParamVal { get; set; }
        public DateTime CreatedOn { get; set; }
        public string AddedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public DateTime TestedOn { get; set; }
        public string ApproverName { get; set; }
    }
}
