namespace FitnessAntrenmanPlatform.Dtos.WorkoutDtos
{
    public class WorkoutExerciseDto
    {
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Sets { get; set; }
        public int Reps { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
