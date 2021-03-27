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
    public class MenuRoleMapController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public MenuRoleMapController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("GetMenuRoleMaps", Name = "GetMenuRoleMaps")]
        public IActionResult GetMenuRoleMaps()
        {
            return Ok(_hospitalServices.GetMenuRoleMaps());
        }

        [HttpGet]
        [Route("GetMenuRoleMap/{id}", Name = "GetMenuRoleMap")]
        public IActionResult GetMenuRoleMap(string id)
        {
            return Ok(_hospitalServices.GetMenuRoleMap(id));
        }

        [HttpPost]
        [Route("AddMenuRoleMap", Name = "AddMenuRoleMap")]
        public IActionResult AddMenuRoleMap(MenuRoleMap menuRole)
        {
            _hospitalServices.AddMenuRoleMap(menuRole);
            return CreatedAtRoute("AddMenuRoleMap", new { id = menuRole.MappingId }, menuRole);

        }

        [HttpDelete]
        [Route("DeleteMenuRoleMap/{id}", Name = "DeleteMenuRoleMap")]
        public IActionResult DeleteMenuRoleMap(string id)
        {
            _hospitalServices.DeleteMenuRoleMap(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateMenuRoleMap", Name = "UpdateMenuRoleMap")]
        public IActionResult UpdateMenuRoleMap(MenuRoleMap menuRole)
        {
            return Ok(_hospitalServices.UpdateMenuRoleMap(menuRole));
        }
    }
}
