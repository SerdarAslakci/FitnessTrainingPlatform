using FitnessAntrenmanPlatform.Dtos.WorkoutDtos;
using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.Mappers.WorkoutMappers
{
    public static class WorkoutExerciseMapper
    {

        public static WorkoutExerciseDto ToWorkoutExercise(this WorkoutExercise workoutExercise)
        {
            return new WorkoutExerciseDto()
            {
                Name = workoutExercise.Name,
                MuscleGroup = workoutExercise.MuscleGroup,
                Sets = workoutExercise.Sets,
                Reps = workoutExercise.Reps,
                Description = workoutExercise.Description,
                IsCompleted = workoutExercise.IsCompleted,
            };

        }
    }
}
