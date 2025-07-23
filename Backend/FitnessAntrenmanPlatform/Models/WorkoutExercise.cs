namespace FitnessAntrenmanPlatform.Models
{
    public class WorkoutExercise
    {
        public int Id { get; set; }
        public int WorkoutPlanId { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Sets { get; set; } 
        public int Reps { get; set; } 
        public string VideoUrl { get; set; } = string.Empty;
        public string Day { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } 



    }
}
