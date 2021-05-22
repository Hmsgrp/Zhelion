using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public  class FileUpload
    {
        public IFormFile Files { get; set; }
        public string HospitalId { get; set; }
        public string Path { get; set; }
    }
}
