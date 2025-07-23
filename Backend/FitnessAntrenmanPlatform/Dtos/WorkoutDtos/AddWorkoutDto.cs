namespace FitnessAntrenmanPlatform.Dtos.WorkoutDtos
{
    public class AddWorkoutDto
    {
        public int WorkoutPlanId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Sets { get; set; }
        public int Reps { get; set; }
        public string Day { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public string MuscleGroup { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
    }
}
