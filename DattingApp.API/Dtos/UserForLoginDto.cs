using System.ComponentModel.DataAnnotations;

namespace DattingApp.API.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        public string  Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4 , ErrorMessage = "You must enter password between 4 and 8 Characters")]
        public string Password { get; set; }
    }
}