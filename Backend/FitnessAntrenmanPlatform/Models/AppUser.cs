using Microsoft.AspNetCore.Identity;

namespace FitnessAntrenmanPlatform.Models
{
    public class AppUser:IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int Age { get; set; }
        public double Height { get; set; }  // Boy (cm)
        public double Weight { get; set; }  // Kilo (kg)
        public DateTime DateOfBirth { get; set; }
        public string FitnessGoal { get; set; } = string.Empty;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public string? ProfilePhotoUrl { get; set; } = string.Empty;
        public double ActivityFactor { get; set; } = 1.2; // default: hareketsiz

    }
}
