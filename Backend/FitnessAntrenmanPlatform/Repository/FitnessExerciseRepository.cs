using FitnessAntrenmanPlatform.Data;
using FitnessAntrenmanPlatform.Dtos.FitnessExercisesDto;
using FitnessAntrenmanPlatform.Interfaces;
using FitnessAntrenmanPlatform.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAntrenmanPlatform.Repository
{
    public class FitnessExerciseRepository : IFitnessExerciseRepository
    {
        private readonly AppDbContext _context;
        public FitnessExerciseRepository(AppDbContext context) 
        {
            _context = context;   
        }

        public async Task<List<FitnessExercise>?> GetFitnessExerciseByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return null;

            var lowerName = name.ToLower().Trim();

            var allExercises = await _context.FitnessExercises.ToListAsync();

            var fullMatchList = allExercises
                .Where(ex => Normalize(ex.Name).Contains(Normalize(lowerName)))
                .ToList();

            if (fullMatchList.Any())
                return fullMatchList;

            var lowerNameWords = Normalize(lowerName).Split(' ', StringSplitOptions.RemoveEmptyEntries);

            var wordMatchList = allExercises
                .Where(ex =>
                {
                    var normalized = Normalize(ex.Name);
                    return lowerNameWords.All(word => normalized.Contains(word));
                })
                .ToList();

            return wordMatchList;
        }

        private string Normalize(string input)
        {
            return input.ToLower()
                        .Trim()
                        .Replace(" ", " ") // non-breaking space
                        .Replace("\u00A0", " ") // just in case
                        .Replace("  ", " ")     // double space
                        .Replace("   ", " ")    // triple space
                        .Replace("    ", " ");  // quadruple space
        }


        public async Task<List<FitnessExercise>> GetFitnessExerciseListAsync(ExerciseQueryDto queryDto)
        {
            var fitnessExercises = _context.FitnessExercises.AsQueryable();

            if(!string.IsNullOrEmpty(queryDto.MuscleGroup))
            {
                fitnessExercises = fitnessExercises.AsQueryable().Where(e => e.MuscleGroup.ToLower()
                                    .Contains(queryDto.MuscleGroup.ToLower()));
            }

            if(!string.IsNullOrEmpty(queryDto.Difficulty))
            {
                fitnessExercises = fitnessExercises.AsQueryable().Where(e => e.Difficulty.Contains(queryDto.Difficulty));
            }

            return await fitnessExercises.ToListAsync();
        }

        public async Task<List<FitnessExercise>> GetFitnessExercisesByDifficultyAsync(string difficulty)
        {
            var exercises = _context.FitnessExercises.AsQueryable().Where(s => s.Difficulty.ToLower() == difficulty.ToLower());
            
            if(exercises == null)
            {
                return null;
            }

            return await exercises.ToListAsync();
        }

        public async Task<List<FitnessExercise>> GetFitnessExercisesByIdAsync(int id)
        {
            var exercise = await _context.FitnessExercises.FirstOrDefaultAsync(x => x.Id == id);

            if(exercise == null)
            {
                return null;
            }
            return new List<FitnessExercise> { exercise };
        }
    }
}
