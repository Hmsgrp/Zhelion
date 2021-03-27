using Hospital.Core.Models;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public UserController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }

        [Authorize]
        [HttpGet]
        [Route("GetUsers", Name = "GetUsers")]
        public IActionResult GetUsers()
        {
            return Ok(_hospitalServices.GetUsers());
        }

        [Authorize]
        [HttpGet]
        [Route("GetUser/{id}", Name = "GetUser")]
        public IActionResult GetUser(string id)
        {
            return Ok(_hospitalServices.GetUser(id));
        }

        [Authorize]
        [HttpPost]
        [Route("AddUser", Name = "AddUser")]
        public IActionResult AddUser(User user)
        {
            var excepUserName = _hospitalServices.CheckUserName(user);
            if (excepUserName.httpStatus == 400)
            {
                return BadRequest(excepUserName);
            }
            var excepEmail = _hospitalServices.CheckEmailId(user);
            if (excepEmail.httpStatus == 400)
            {
                return BadRequest(excepEmail);
            }
            _hospitalServices.AddUser(user);
            return CreatedAtRoute("AddUser", new { id = user.UserID }, user);

        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteUser/{id}", Name = "DeleteUser")]
        public IActionResult DeleteUser(string id)
        {
            _hospitalServices.DeleteUser(id);
            return NoContent();
        }

        [Authorize]
        [HttpPut]
        [Route("UpdateUser", Name = "UpdateUser")]
        public IActionResult UpdateUser(User user)
        {
            return Ok(_hospitalServices.UpdateUser(user));
        }
	[AllowAnonymous]
        [HttpGet]
        [Route("GetSignUpLink/{refID}", Name = "GetSignUpLink")]
        public IActionResult GetSignUpLink(string refID)
        {
            return Ok(_hospitalServices.GetSignUpLink(refID));
        }



    }
}
