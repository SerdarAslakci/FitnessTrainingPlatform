namespace FitnessAntrenmanPlatform.Models
{
    public class WorkoutPlan
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string PlanName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } 
        public AppUser? User { get; set; }
        public List<WorkoutExercise>? Exercises { get; set; }


    }
}
