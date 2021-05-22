using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class userMappingDetails
    {
        public string UserID { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }

        public string Hospital_PID { get; set; }

        public string URLGenerated { get; set; }

        public string RedirectionLink { get; set; }

        public bool IsRegistered { get; set; }

        public bool MappingURLActive { get; set; }

        public bool IsPaid { get; set; }

    }
}
