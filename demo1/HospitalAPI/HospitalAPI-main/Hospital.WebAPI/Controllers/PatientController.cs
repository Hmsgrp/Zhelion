using Hospital.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public PatientController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }


        [HttpGet]
        [Route("GetActiveTestByPatientID/{patientId}", Name = "GetActiveTestByPatientID")]
        public IActionResult GetActiveTestByPatientID(string patientId)
        {
            return Ok(_hospitalServices.GetActiveTestByPatientID(patientId));

        }

        [HttpGet]
        [Route("GetAllOrdersByPatientID", Name = "GetAllOrdersByPatientID")]
        public IActionResult GetAllOrdersByPatientID(string h_Pid, string hospitalId)
        {
            return Ok(_hospitalServices.GetAllOrdersByPatientID(h_Pid, hospitalId));
        }
    }
}
