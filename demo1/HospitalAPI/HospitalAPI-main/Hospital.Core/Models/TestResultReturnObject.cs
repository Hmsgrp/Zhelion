using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class TestResultReturnObject
    {
        public Result CurrentResult { get; set; }
        public List<Result> Last30DaysResultsList { get; set; }
    }
}
