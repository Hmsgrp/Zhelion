using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class TestParameterResult
    {
        public string TestParameterId { get; set; }
        public string TestId { get; set; }
        public string ParameterName { get; set; }
        public decimal RangesFrom { get; set; }
        public decimal RangesTo { get; set; }
        public string TestedResult { get; set; }
    }
}
