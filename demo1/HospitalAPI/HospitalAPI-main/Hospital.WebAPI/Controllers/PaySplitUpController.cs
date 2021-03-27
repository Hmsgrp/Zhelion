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
    public class PaySplitUpController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        public PaySplitUpController(IHospitalServices hospitalServices, IConfiguration iconfiguration)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
        }

        [HttpGet]
        [Route("GetPaySplitUps", Name = "GetPaySplitUps")]
        public IActionResult GetPaySplitUps()
        {
            return Ok(_hospitalServices.GetPaySplitups());
        }

        [HttpGet]
        [Route("GetPaySplitUp/{id}", Name = "GetPaySplitUp")]
        public IActionResult GetPaySplitUp(string id)
        {
            return Ok(_hospitalServices.GetPaySplitup(id));
        }

        [HttpPost]
        [Route("AddPaySplitUp", Name = "AddPaySplitUp")]
        public IActionResult AddPaySplitUp(PaySplitUp splitup)
        {
            _hospitalServices.AddPaySplitup(splitup);
            return CreatedAtRoute("AddPaySplitUp", new { id = splitup.SplitUpID }, splitup);

        }

        
    }
}
