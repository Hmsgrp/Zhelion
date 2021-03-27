using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class ExceptionResult
    {
        public int httpStatus { get; set; }
        public string httpStatusText { get; set; }
        public string errorDetails { get; set; }
    }
}
