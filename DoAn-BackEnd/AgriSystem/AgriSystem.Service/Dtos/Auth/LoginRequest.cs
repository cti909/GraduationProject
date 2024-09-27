using System.ComponentModel.DataAnnotations;

namespace AgriSystem.Service.Dtos.Auth
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username not null")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password not null")]
        public string Password { get; set; }
    }
}
