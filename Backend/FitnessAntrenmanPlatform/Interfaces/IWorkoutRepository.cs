using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.Interfaces
{
    public interface IWorkoutRepository
    {
        public Task<List<WorkoutExercise>> GetAllExerciseListAsync(string userId);
        public Task<List<WorkoutExercise>> CompleteDayExercises(string userId,string day);
        public Task<bool> ResetWeekExercises(string userId);
        public Task<WorkoutPlan> DeleteWorkoutPlanAsync(string userId);
        public Task<List<WorkoutExercise>> CreateExercisePlanAsync(List<WorkoutExercise> workoutExercises);


    }
}
