using Hospital.Core.Models;
using Hospital.Core.Models.Jwt;
using Hospital.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;

namespace Hospital.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IHospitalServices _hospitalServices;
        private readonly IConfiguration _iconfiguration;
        private readonly TokenManagement _tokenManagement;
        public AuthController(IHospitalServices hospitalServices, IConfiguration iconfiguration, TokenManagement tokenManagement)
        {
            _hospitalServices = hospitalServices;
            _iconfiguration = iconfiguration;
            _tokenManagement = tokenManagement;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Login", Name = "Login")]
        public IActionResult Login(Login user)
        {
            if (user == null)
                return BadRequest("Not Found");

            if (_hospitalServices.isAuthorized(user))
            {
                var _user = _hospitalServices.GetUserByUserName(user.UserName);
                var roleMenuInfo = _hospitalServices.GetMenuRoleMapByRoleId(_user.RoleId);
                var builder = new StringBuilder();
                foreach (var menu in roleMenuInfo.MenuInfo)
                {
                    builder.Append(menu.MenuName).Append("|");
                }
                string menuIdList = builder.ToString();
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(ClaimTypes.Role,roleMenuInfo.RoleName),
                    new Claim(ClaimTypes.Anonymous, menuIdList)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var jwtToken = new JwtSecurityToken(
                    _tokenManagement.Issuer,
                    _tokenManagement.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                    signingCredentials: credentials);
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return Ok(new LoginResult
                {
                    UserName = user.UserName,
                    JwtToken = token
                });
            }
            return Unauthorized();
        }


        [HttpGet]
        [Route("GenarateOtp/{userId}", Name = "GenarateOtp")]
        public IActionResult GenarateOtp(string userId)
        {
            _hospitalServices.GenarateOtp(userId);
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("LoginV1", Name = "LoginV1")]
        public IActionResult LoginV1(Login user)
        {
            if (user == null)
                return BadRequest("Not Found");

            if (_hospitalServices.isAuthorizedDoctor(user))
            {
                var _user = _hospitalServices.GetUserByUserName(user.UserName);
                var roleMenuInfo = _hospitalServices.GetMenuRoleMapByRoleId(_user.RoleId);
                var hospitalList = _hospitalServices.GetHospitalListByUserID(_user.UserID);

                var hospitalJson = JsonConvert.SerializeObject(hospitalList);
                var builder = new StringBuilder();
                foreach (var menu in roleMenuInfo.MenuInfo)
                {
                    builder.Append(menu.MenuName).Append(",");
                }
                string menuIdList = builder.ToString();
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(ClaimTypes.Role,roleMenuInfo.RoleName),
                    new Claim(ClaimTypes.Anonymous, menuIdList),
                    new Claim(ClaimTypes.Uri,hospitalJson),
                    new Claim(ClaimTypes.NameIdentifier,_user.UserID),
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var jwtToken = new JwtSecurityToken(
                    _tokenManagement.Issuer,
                    _tokenManagement.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                    signingCredentials: credentials);
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return Ok(new LoginResult
                {
                    UserName = user.UserName,
                    JwtToken = token
                });
            }
            return Unauthorized();
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("LoginV2", Name = "LoginV2")]
        public IActionResult LoginV2(Login user)
        {
            if (user == null)
                return BadRequest("Not Found");

            if (_hospitalServices.isAuthorizedPatient(user))
            {
                var _user = _hospitalServices.GetUserByUserName(user.UserName);
                var roleMenuInfo = _hospitalServices.GetMenuRoleMapByRoleId(_user.RoleId);

                var builder = new StringBuilder();
                foreach (var menu in roleMenuInfo.MenuInfo)
                {
                    builder.Append(menu.MenuName).Append(",");
                }
                string menuIdList = builder.ToString();
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(ClaimTypes.Role,roleMenuInfo.RoleName),
                    new Claim(ClaimTypes.Anonymous, menuIdList),
                    new Claim(ClaimTypes.NameIdentifier,_user.UserID),
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var jwtToken = new JwtSecurityToken(
                    _tokenManagement.Issuer,
                    _tokenManagement.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                    signingCredentials: credentials);
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return Ok(new LoginResult
                {
                    UserName = user.UserName,
                    JwtToken = token
                });
            }
            return Unauthorized();
        }
    }
}
