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
    public class LabController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public LabController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }
        [HttpGet]
        [Route("GetLabs", Name = "GetLabs")]
        public IActionResult GetLabs()
        {
            return Ok(_hospitalServices.GetLabs());
        }

        [HttpGet]
        [Route("GetLab/{id}", Name = "GetLab")]
        public IActionResult GetLab(string id)
        {
            return Ok(_hospitalServices.GetLab(id));
        }

        [HttpPost]
        [Route("AddLab", Name = "AddLab")]
        public IActionResult AddLab(LabList lab)
        {
            var result = _hospitalServices.AddUser(lab.userDetails);
            lab.labDetails.UserId = result.UserID;
            _hospitalServices.AddLab(lab.labDetails);
            return CreatedAtRoute("AddLab", new { id = lab.labDetails.LabId }, lab);

        }

        [HttpDelete]
        [Route("DeleteLab/{id}", Name = "DeleteLab")]
        public IActionResult DeleteLab(string id)
        {
            _hospitalServices.DeleteLab(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateLab", Name = "UpdateLab")]
        public IActionResult UpdateLab(Lab lab)
        {
            return Ok(_hospitalServices.UpdateLab(lab));
        }
    }
}
