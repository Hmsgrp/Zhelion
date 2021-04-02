using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class RolesController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public RolesController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }
        [HttpGet]
        [Route("GetRoles", Name = "GetRoles")]
        public IActionResult GetRoles()
        {
            return Ok(_hospitalServices.GetRoles());
        }

        [HttpGet]
        [Route("GetRole/{id}", Name = "GetRole")]
        public IActionResult GetRole(string id)
        {
            return Ok(_hospitalServices.GetRole(id));
        }

        [HttpPost]
        [Route("AddRole", Name = "AddRole")]
        public IActionResult AddRole(Role role)
        {

            _hospitalServices.AddRole(role);
            return CreatedAtRoute("GetRole", new { id = role.RoleId }, role);

        }

        [HttpDelete]
        [Route("DeleteRole/{id}", Name = "DeleteRole")]
        public IActionResult DeleteRole(string id)
        {
            var excepRole = _hospitalServices.IsRoleReferenced(id);
            if (excepRole.httpStatus == 400)
            {
                return BadRequest(excepRole);
            }
            _hospitalServices.DeleteRole(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateRole", Name = "UpdateRole")]
        public IActionResult UpdateRole(Role role)
        {
            return Ok(_hospitalServices.UpdateRole(role));
        }
    }
}
