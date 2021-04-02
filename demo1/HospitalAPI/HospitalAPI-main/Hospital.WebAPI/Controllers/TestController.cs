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

    }
}
