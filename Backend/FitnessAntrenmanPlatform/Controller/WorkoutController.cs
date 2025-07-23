using FitnessAntrenmanPlatform.Dtos.WorkoutDtos;
using FitnessAntrenmanPlatform.Interfaces;
using FitnessAntrenmanPlatform.Mappers.WorkoutMappers;
using FitnessAntrenmanPlatform.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FitnessAntrenmanPlatform.Controller
{

    [ApiController]
    [Route("api/MyWorkoutPlan")]
    public class WorkoutController:ControllerBase
    {
        private readonly IWorkoutRepository _workoutRepository;
        public WorkoutController(IWorkoutRepository workoutRepository) 
        { 
            _workoutRepository = workoutRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserWorkout()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId)) { return Unauthorized(); }

                var exercises = await _workoutRepository.GetAllExerciseListAsync(userId);

                if (exercises == null) { return NotFound(); }


                var groupExercises = exercises.GroupBy(x => x.Day)
                                     .Select(g => new
                                     {
                                         Day = g.Key,
                                         Exercises = g.Select(s => s.ToWorkoutExercise()).ToList()
                                     })
                                     .ToList();


                return Ok(groupExercises);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteUserWorkoutPlan()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId)) { return Unauthorized(); }

                var workoutPlan = _workoutRepository.DeleteWorkoutPlanAsync(userId);    

                if (workoutPlan == null) {return NotFound(); }

                return Ok(workoutPlan);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }
        [Authorize]
        [HttpPut("CompleteDay")]
        public async Task<IActionResult> CompleteDayExerciseAsync([FromQuery] string day)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId)) { return Unauthorized(); }

                var exercises = await _workoutRepository.CompleteDayExercises(userId, day);

                if (exercises == null) { return NotFound("Exercises Not Found"); }

                return Ok(exercises);
            }
            catch(Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize, HttpPut("ResetAllWeek")]
        public async Task<IActionResult> ResetWeekExercises()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId)) { return Unauthorized(); }

                var IsReset = await _workoutRepository.ResetWeekExercises(userId);

                if (!IsReset)
                {
                    return BadRequest("No exercises were completed, so reset could not be performed");
                }
                else
                {
                    return Ok(new { message = "All weekly exercises have been reset" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while resetting the exercises", error = ex.Message });
            }
        }

        [HttpPost("create-plan")]
        public async Task<IActionResult> CreateWorkoutPlan([FromBody] List<AddWorkoutDto> dtoList)
        {
            if (dtoList == null || !dtoList.Any())
                return BadRequest("Gönderilen liste boş.");

            var workoutExercises = dtoList.Select(dto => new WorkoutExercise
            {
                WorkoutPlanId = dto.WorkoutPlanId,
                Name = dto.Name,
                Description = dto.Description,
                Sets = dto.Sets,
                Reps = dto.Reps,
                Day = dto.Day,
                IsCompleted = dto.IsCompleted,
                MuscleGroup = dto.MuscleGroup,
                VideoUrl = dto.VideoUrl
            }).ToList();

            var result = await _workoutRepository.CreateExercisePlanAsync(workoutExercises);

            return Ok(result);
        }

    }
}
