namespace FitnessAntrenmanPlatform.Dtos.UserDtos
{
    public class UpdateQuery
    {
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public int Age { get; set; }
        public double Height { get; set; }  // Boy (cm)
        public double Weight { get; set; }  // Kilo (kg)
        public string? PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }  
        public string FitnessGoal { get; set; } = string.Empty;

    }
}
