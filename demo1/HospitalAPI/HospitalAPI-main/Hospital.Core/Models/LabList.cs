using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class LabList
    {
        public User userDetails { get; set; }
        public Lab labDetails { get; set; }
        public LabMapping labMappingDetails { get; set; }
    }
}
