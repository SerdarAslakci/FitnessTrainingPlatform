using FitnessAntrenmanPlatform.Dtos.FoodDtos;
using FitnessAntrenmanPlatform.Interfaces;
using FitnessAntrenmanPlatform.Models;
using FitnessAntrenmanPlatform.Repository;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAntrenmanPlatform.Controller
{
    [ApiController]
    [Route("api/foods")]
    public class FoodController:ControllerBase
    {
        private readonly IFoodRepository _foodRepository;
        public FoodController(IFoodRepository foodRepository) 
        {
            _foodRepository = foodRepository;
        }


        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAllFoods([FromQuery] FoodQuery foodQuery)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var foods = await _foodRepository.GetAllFoodsAsync(foodQuery);

                if(foods == null) return NotFound();

                return Ok(foods);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }

        }

        [HttpGet]
        [Route("{foodName}")]
        public async Task<IActionResult> GetFoodByName([FromRoute] string foodName)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var foods = await _foodRepository.GetFoodbByNameAsync(foodName);

                if (foods == null) return NotFound();

                return Ok(foods);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("delete-food/{foodId}")]
        public async Task<IActionResult> DeleteFoodById([FromRoute] int foodId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var deletedFood = await _foodRepository.DeleteFoodByIdAsync(foodId);

                if(deletedFood == null) return NotFound();

                return Ok(deletedFood);

            }
            catch(Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-food/{foodId}")]
        public async Task<IActionResult> UpdateFood([FromRoute] int foodId, [FromBody] UpdateFoodDto updateFoodDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var updatedFood = await _foodRepository.UpdateFoodAsync(foodId, updateFoodDto);

                if(updatedFood == null) return NotFound();

                return Ok(updatedFood);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddFood([FromBody] AddFoodDto addFoodDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                var food = new Food
                {
                    Name = addFoodDto.Name,
                    Calories = addFoodDto.Calories,
                    Protein = addFoodDto.Protein,
                    Carbs = addFoodDto.Carbs,
                    Fats = addFoodDto.Fats,
                };

                var added = await _foodRepository.AddFoodAsync(food);
                if(added == null) return BadRequest();

                return Ok(added);   
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    }
}
