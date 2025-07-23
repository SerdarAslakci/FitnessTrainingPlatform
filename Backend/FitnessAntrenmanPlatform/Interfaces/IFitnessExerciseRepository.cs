using FitnessAntrenmanPlatform.Dtos.FitnessExercisesDto;
using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.Interfaces
{
    public interface IFitnessExerciseRepository
    {
        Task<List<FitnessExercise>> GetFitnessExerciseListAsync(ExerciseQueryDto queryDto);
        Task<List<FitnessExercise>> GetFitnessExerciseByNameAsync(string name);
        Task<List<FitnessExercise>> GetFitnessExercisesByDifficultyAsync(string difficulty);
        Task<List<FitnessExercise>> GetFitnessExercisesByIdAsync(int id);

    }
}
