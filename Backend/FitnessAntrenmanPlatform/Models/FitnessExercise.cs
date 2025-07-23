namespace FitnessAntrenmanPlatform.Models
{
    public class FitnessExercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
        public string? Difficulty { get; set; } = string.Empty;
        public string? ImgUrl { get; set; } = string.Empty;
        public string? VideoUrl { get; set; } = string.Empty;
    }
}
