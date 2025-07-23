using FitnessAntrenmanPlatform.Dtos.FitnessExercisesDto;
using FitnessAntrenmanPlatform.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAntrenmanPlatform.Controller
{
    [ApiController]
    [Route("api/FitnessExercises")]
    public class FitnessExerciseController:ControllerBase
    {
        private readonly IFitnessExerciseRepository _fitnessRepo;
        public FitnessExerciseController(IFitnessExerciseRepository fitnessRepo) 
        {
            _fitnessRepo = fitnessRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExercises([FromQuery] ExerciseQueryDto queryDto)     
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var exercises = await _fitnessRepo.GetFitnessExerciseListAsync(queryDto);

                if (exercises == null) return BadRequest(ModelState);

                return Ok(exercises);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet]
        [Route("name/{name}")]
        public async Task<IActionResult> GetExerciseByName([FromRoute] string name)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            try
            {
                var exercise = await _fitnessRepo.GetFitnessExerciseByNameAsync(name);

                if(exercise == null)
                {
                    return NotFound();
                }

                return Ok(exercise);    

            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetExerciseById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            try
            {
                var exercise = await _fitnessRepo.GetFitnessExercisesByIdAsync(id);

                if (exercise == null)
                {
                    return NotFound();
                }

                return Ok(exercise);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("difficulty/{difficulty}")]
        public async Task<IActionResult> GetExerciesByDifficulty([FromRoute] string difficulty)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var exercises = await _fitnessRepo.GetFitnessExercisesByDifficultyAsync(difficulty);

                if(exercises == null) return NotFound();

                return Ok(exercises);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }






        


    }
}
