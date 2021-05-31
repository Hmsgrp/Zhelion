using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public HospitalController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }
        

        [HttpGet]
        [Route("GetHospitals", Name = "GetHospitals")]
        public IActionResult GetHospitals()
        {
            return Ok(_hospitalServices.GetHospitals());
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllHospitals", Name = "GetAllHospitals")]
        public IActionResult GetAllHospitals()
        {
            return Ok(_hospitalServices.GetHospitals());
        }

        //This method returns hospital with no logo
        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllHospitalsV2", Name = "GetAllHospitalsV2")]
        public IActionResult GetAllHospitalsV2()
        {
            return Ok(_hospitalServices.GetHospitalsV2());
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetHospital/{id}", Name = "GetHospital")]
        public IActionResult GetHospital(string id)
        {
            return Ok(_hospitalServices.GetHospital(id));
        }

        [HttpPost]
        [Route("AddHospital", Name = "AddHospital")]
        public IActionResult AddHospital(Hospitaal hospital)
        {

            _hospitalServices.AddHospital(hospital);
            return CreatedAtRoute("AddHospital", new { id = hospital.HospitalId }, hospital);

        }

        [HttpDelete]
        [Route("DeleteHospital/{id}", Name = "DeleteHospital")]
        public IActionResult DeleteHospital(string id)
        {
            _hospitalServices.DeleteHospital(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateHospital", Name = "UpdateHospital")]
        public IActionResult UpdateHospital(Hospitaal hospital)
        {
            return Ok(_hospitalServices.UpdateHospital(hospital));
        }

        [HttpGet]
        [Route("GetpatientList/{hospitalID}", Name = "GetpatientList")]
        public IActionResult GetpatientList(string hospitalID)
        {
            return Ok(_hospitalServices.GetpatientList(hospitalID));
        }



    }


}

