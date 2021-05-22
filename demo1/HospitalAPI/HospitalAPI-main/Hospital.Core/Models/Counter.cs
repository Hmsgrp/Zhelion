using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson.Serialization.Attributes;

namespace Hospital.Core.Models
{
    public class Counter
    {
        public string Id { get; set; }
        public int Value { get; set; }
    }
}
