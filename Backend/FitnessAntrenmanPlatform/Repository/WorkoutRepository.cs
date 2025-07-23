using FitnessAntrenmanPlatform.Data;
using FitnessAntrenmanPlatform.Interfaces;
using FitnessAntrenmanPlatform.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAntrenmanPlatform.Repository
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly AppDbContext _context;
        public WorkoutRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task<List<WorkoutExercise>?> CompleteDayExercises(string userId, string day)
        {
            var workoutPlan = await _context.WorkoutPlans.FirstOrDefaultAsync(x => x.UserId == userId);
            
            if (workoutPlan == null) {return null;}

            var exercises = await _context.WorkoutExercises.Where(x => x.WorkoutPlanId == workoutPlan.Id && x.Day.ToLower() == day.ToLower()).ToListAsync();

            if (exercises == null) { return null;}

            foreach(var exercise in exercises)
            {
                exercise.IsCompleted = true;
            }

            await _context.SaveChangesAsync();
            return exercises;
            
        }
        public async Task<List<WorkoutExercise>> CreateExercisePlanAsync(List<WorkoutExercise> workoutExercises)
        {
            if (workoutExercises == null || !workoutExercises.Any())
                return new List<WorkoutExercise>();

            await _context.WorkoutExercises.AddRangeAsync(workoutExercises);
            await _context.SaveChangesAsync();

            return workoutExercises;
        }

        public async Task<WorkoutPlan?> DeleteWorkoutPlanAsync(string userId)
        {
            var workoutPlan = await _context.WorkoutPlans.FirstOrDefaultAsync(plan => plan.UserId == userId);

            if (workoutPlan == null) return null;

            _context.WorkoutPlans.Remove(workoutPlan);
            await _context.SaveChangesAsync();

            return workoutPlan; 

        }

        public async Task<List<WorkoutExercise>?> GetAllExerciseListAsync(string userId)
        {
            var workoutPlan = await _context.WorkoutPlans.FirstOrDefaultAsync(x => x.UserId == userId);

            if (workoutPlan == null) return null;

            var exercises = await _context.WorkoutExercises.Where(s => s.WorkoutPlanId == workoutPlan.Id).ToListAsync();

            if (exercises == null) return null;

            return exercises;

        }

        public async Task<bool> ResetWeekExercises(string userId)
        {
            var workoutPlan = await _context.WorkoutPlans.FirstOrDefaultAsync(x => x.UserId == userId);

            if (workoutPlan == null) return false;

            var exercises = await _context.WorkoutExercises.Where(s => s.WorkoutPlanId == workoutPlan.Id).ToListAsync();

            if (exercises == null) return false;

            if(exercises.All(s => s.IsCompleted))
            {
                foreach(var exercise in exercises)
                {
                    exercise.IsCompleted = false;
                }
            }
            await _context.SaveChangesAsync();

            if(exercises.Any(s => s.IsCompleted))
            {
                return false;
            }

            return true;


            
        }
    }
}
