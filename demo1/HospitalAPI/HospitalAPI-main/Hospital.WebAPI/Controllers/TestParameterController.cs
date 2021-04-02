using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TestParameterController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public TestParameterController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("GetTestParameters", Name = "GetTestParameters")]
        public IActionResult GetTestParameters()
        {
            return Ok(_hospitalServices.GetTestParameters());
        }

        [HttpGet]
        [Route("GetTestParameter/{id}", Name = "GetTestParameter")]
        public IActionResult GetTestParameter(string id)
        {
            return Ok(_hospitalServices.GetTestParameter(id));
        }

        [HttpPost]
        [Route("AddTestParameter", Name = "AddTestParameter")]
        public IActionResult AddTestParameter(TestParameter test)
        {
            _hospitalServices.AddTestParameter(test);
            return CreatedAtRoute("AddTestParameter", new { id = test.TestParameterId }, test);

        }

        [HttpDelete]
        [Route("DeleteTestParameter/{id}", Name = "DeleteTestParameter")]
        public IActionResult DeleteTestParameter(string id)
        {
            _hospitalServices.DeleteTestParameter(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateTestParameter", Name = "UpdateTestParameter")]
        public IActionResult UpdateTestParameter(TestParameter test)
        {
            return Ok(_hospitalServices.UpdateTestParameter(test));
        }
    }
}
