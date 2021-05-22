using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DoctorController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public DoctorController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }
        [HttpPost]
        [Route("DoctorRefer", Name = "DoctorRefer")]
        public IActionResult DoctorRefer(DoctorRefer doctorRef)
        {
            var excepUserName = _hospitalServices.CheckUserName(doctorRef.user);
            if (excepUserName.httpStatus == 400)
            {
                return BadRequest(excepUserName);
            }
            var excepEmail = _hospitalServices.CheckEmailId(doctorRef.user);
            if (excepEmail.httpStatus == 400)
            {
                return BadRequest(excepEmail);
            }
            Ok(_hospitalServices.AddDoctor(doctorRef));
            return CreatedAtRoute("DoctorRefer", new { id = doctorRef.user }, doctorRef);
        }

        [HttpGet]
        [Route("GetDoctorRefers", Name = "GetDoctorRefers")]
        public IActionResult GetDoctorRefers()
        {
            return Ok(_hospitalServices.GetDoctorRefers());
        }
        [HttpGet]
        [Route("GetDoctorRefersById/{id}", Name = "GetDoctorRefersById")]
        public IActionResult GetDoctorRefersById(string id)
        {
            return Ok(_hospitalServices.GetDoctorRefersById(id));
        }

 	    [AllowAnonymous]
        [HttpGet]
        [Route("GetDoctorDataByUserId/{id}", Name = "GetDoctorDataByUserId")]
        public IActionResult GetDoctorDataByUserId(string id)
        {
            return Ok(_hospitalServices.GetDoctorRefersById(id));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetDoctorLoginURl/{url}", Name = "GetDoctorLoginURl")]
        public IActionResult GetDoctorLoginURl(string url)
        {
            return Ok(_hospitalServices.GetMappingURL(url));
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("DeleteDoctor/{id}", Name = "DeleteDoctor")]
        public IActionResult DeleteDoctor(string id)
        {
            _hospitalServices.DeleteDoctor(id);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("DoctorSignup", Name = "DoctorSignup")]
        public IActionResult DoctorSignup(DoctorRefer doctorRef)
        {
            var chkpwd = _hospitalServices.CheckPWordOTP(doctorRef.user);
            if (chkpwd.httpStatus == 400)
            {
                return BadRequest(chkpwd);
            }
            return Ok(_hospitalServices.UpdateDoctor(doctorRef));
        }

        [HttpPost]
        [Route("PrescribeTest", Name = "PrescribeTest")]
        public IActionResult PrescribeTest(PrescribeTestResult prescribeTest)
        {
            return Ok(_hospitalServices.PrescribeTest(prescribeTest.testId,prescribeTest.patientId,prescribeTest.outMobileNo,prescribeTest.hospId,prescribeTest.doctorId, prescribeTest.numberOfTest));
            
        }

        [HttpGet]
        [Route("GetActiveNotification/{userID}", Name = "GetActiveNotification")]
        public IActionResult GetActiveNotification(string userID)
        {
            return Ok(_hospitalServices.GetActiveNotification(userID));
        }


        [HttpGet]
        [Route("CloseNotification/{NotificationID}", Name = "CloseNotification")]
        public IActionResult CloseNotification(string NotificationID)
        {
            return Ok(_hospitalServices.CloseNotification(NotificationID));
        }
    }
}
