using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  //  [Authorize]
    public class TestController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public TestController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("GetTests", Name = "GetTests")]
        public IActionResult GetTests()
        {
            return Ok(_hospitalServices.GetTests());
        }

        [HttpGet]
        [Route("GetTest/{id}", Name = "GetTest")]
        public IActionResult GetTest(string id)
        {
            return Ok(_hospitalServices.GetTest(id));
        }

        [HttpPost]
        [Route("AddTest", Name = "AddTest")]
        public IActionResult AddTest(Test test)
        {
            _hospitalServices.AddTest(test);
            return CreatedAtRoute("AddTest", new { id = test.TestId }, test);

        }

        [HttpDelete]
        [Route("DeleteTest/{id}", Name = "DeleteTest")]
        public IActionResult DeleteTest(string id)
        {
            _hospitalServices.DeleteTest(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateTest", Name = "UpdateTest")]
        public IActionResult UpdateTest(Test test)
        {
            return Ok(_hospitalServices.UpdateTest(test));
        }

        [HttpGet]
        [Route("IsorderPaymentcompleted", Name = "IsorderPaymentcompleted")]
        public IActionResult IsorderPaymentcompleted(string orderId)
        {
            return Ok(_hospitalServices.IsorderPaymentcompleted(orderId));
        }

        [HttpPost]
        [Route("AddResult", Name = "AddResult")]
        public IActionResult AddResult(ResultInput result)
        {
            return Ok(_hospitalServices.AddResult(result));
        }

        [HttpGet]
        [Route("ViewResult", Name = "ViewResult")]
        public IActionResult GetResultListLab(ResultFilter resultFilter)
        {
            return Ok(_hospitalServices.GetResultListLab(resultFilter));
        }

        [HttpGet]
        [Route("GetAllTestResults", Name = "GetAllTestResults")]
        public IActionResult GetAllTestResults()
        {
            return Ok(_hospitalServices.GetAllTestResults());
        }

        [HttpGet]
        [Route("TestResultByID", Name = "TestResultByID")]
        public IActionResult TestResultByID(string resultID)
        {
            return Ok(_hospitalServices.TestResultByID(resultID));
        }

        [HttpGet]
        [Route("RetriveDataForReport", Name = "RetriveDataForReport")]
        public IActionResult RetriveDataForReport(string resultID)
        {
            return Ok(_hospitalServices.RetriveDataForReport(resultID));
        }


        [HttpPost]
        [Route("GetFilteredTestResults", Name = "GetFilteredTestResults")]
        public IActionResult GetFilteredTestResults(ResultFilter resultFilter)
        {
            return Ok(_hospitalServices.GetResultListLab(resultFilter));
        }

        [HttpGet]
        [Route("RetriveReportforLatestOrder", Name = "RetriveReportforLatestOrder")]
        public IActionResult RetriveReportforLatestOrder(string HPID, string HospitalId)
        {
            return Ok(_hospitalServices.RetriveReportforLatestOrder(HPID,HospitalId));
        }

    }
}
