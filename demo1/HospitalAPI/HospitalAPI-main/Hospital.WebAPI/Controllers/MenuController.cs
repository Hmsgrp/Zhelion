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
    public class MenuController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public MenuController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("GetMenus", Name = "GetMenus")]
        public IActionResult GetMenus()
        {
            return Ok(_hospitalServices.GetMenus());
        }

        [HttpGet]
        [Route("GetMenu/{id}", Name = "GetMenu")]
        public IActionResult GetMenu(string id)
        {
            return Ok(_hospitalServices.GetMenu(id));
        }

        [HttpPost]
        [Route("AddMenu", Name = "AddMenu")]
        public IActionResult AddMenu(Menu menu)
        {
            _hospitalServices.AddMenu(menu);
            return CreatedAtRoute("AddMenu", new { id = menu.MenuId }, menu);

        }

        [HttpDelete]
        [Route("DeleteMenu/{id}", Name = "DeleteMenu")]
        public IActionResult DeleteMenu(string id)
        {
            var excepMenu = _hospitalServices.IsMenuReferenced(id);
            if (excepMenu.httpStatus == 400)
            {
                return BadRequest(excepMenu);
            }
            _hospitalServices.DeleteMenu(id);
            return NoContent();
        }

        [HttpPut]
        [Route("UpdateMenu", Name = "UpdateMenu")]
        public IActionResult UpdateMenu(Menu menu)
        {
            return Ok(_hospitalServices.UpdateMenu(menu));
        }
    }
}
