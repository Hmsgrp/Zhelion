using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospital.Core.Models
{
    public class Login
    {
        [Required]
        [JsonPropertyName("username")]
        public string UserName { get; set; }
        [Required]
        [JsonPropertyName("Password")]
        public string Password { get; set; }

        public int OTP { get; set; }
    }

    public class LoginResult
    {
        public string UserName { get; set; }
        public string JwtToken { get; set; }
    }
}
