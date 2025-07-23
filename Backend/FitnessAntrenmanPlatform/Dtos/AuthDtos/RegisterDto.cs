using System.ComponentModel.DataAnnotations;

namespace FitnessAntrenmanPlatform.Dtos.AuthDtos
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [Range(0,100)]
        public int Age { get; set; }

        [Required]
        [Range(0,250)]
        public double Height { get; set; }

        [Required]
        [Range(0,300)]
        public double Weight { get; set; }

        [Required]
        [DataType(DataType.Date, ErrorMessage = "Geçerli bir tarih giriniz.")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string FitnessGoal { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }


    }

}
