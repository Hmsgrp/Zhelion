using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hospital.Core.Models
{
    public class Result
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string ResultId { get; set; }
        public string OrderId { get; set; }
        public string LabId { get; set; }
        public string TestId { get; set; }
        public string PatientId { get; set; }
        public List<TestParameterResult> ResultJSON { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ApprovedBy { get; set; }
        public string cashreciptNumber { get; set; }
        public string RefferedBy { get; set; }
        public string PatientName { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public string PathologicalCondition { get; set; }
        public string SpecimenType { get; set; }
        public string TestMethodUsed { get; set; }
        public string Detailsofspecimenpreparation { get; set; }
        public string Observation { get; set; }
        public string TestName { get; set; }
        public string ResultStatus { get; set; }
        public string HospitalID { get; set; }
        public int DischargeID { get;  set; }
        public string TestApprovedBy { get; set; }
        public string TestDoneBy { get; set; }
        public string TestCollectedWard { get; set; }
        public DateTime TestReportedDate { get; set; }
        public DateTime TestReceivedDate { get; set; }
    }
}
