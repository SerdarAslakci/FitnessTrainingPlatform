using FitnessAntrenmanPlatform.Data;
using FitnessAntrenmanPlatform.Dtos.FoodDtos;
using FitnessAntrenmanPlatform.Interfaces;
using FitnessAntrenmanPlatform.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAntrenmanPlatform.Repository
{
    public class FoodRepository : IFoodRepository
    {
        private readonly AppDbContext _context;
        public FoodRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task<Food> AddFoodAsync(Food food)
        {
            var addedFood = await _context.Foods.AddAsync(food);

            if (addedFood == null) return null;

            await _context.SaveChangesAsync();

            return food;

        }

        public async Task<Food> DeleteFoodByIdAsync(int id)
        {
            var food = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if (food == null) { return null; }

            _context.Foods.Remove(food);
            _context.SaveChangesAsync();

            return food;
        }

        public async Task<List<Food>> GetAllFoodsAsync(FoodQuery foodQuery)
        {
            var foods = _context.Foods.AsQueryable();

            if (!string.IsNullOrEmpty(foodQuery.foodType))
            {
                if (foodQuery.foodType.ToLower() == "protein")
                {
                    foods = foods.Where(s => s.Protein > s.Carbs && s.Protein > s.Fats);
                }

                if (foodQuery.foodType.ToLower() == "karbonhidrat")
                {
                    foods = foods.Where(s => s.Carbs > s.Protein && s.Carbs > s.Fats);
                }

                if (foodQuery.foodType.ToLower() == "yağ")
                {
                    foods = foods.Where(s => s.Fats > s.Carbs && s.Fats > s.Protein);
                }
            }

            if(foodQuery.minCalories != null && foodQuery.maxCalories != null)
            {
                foods = foods.Where(f => f.Calories <= foodQuery.maxCalories && f.Calories >= foodQuery.minCalories);
            }
            else if (foodQuery.maxCalories != null)
            {
                foods = foods.Where(f => f.Calories <= foodQuery.maxCalories);
            }
            else if(foodQuery.minCalories != null)
            {
                foods = foods.Where(f => f.Calories >= foodQuery.minCalories);    
            }

            return await foods.ToListAsync();
        }

        public async Task<List<Food>> GetFoodbByNameAsync(string foodName)
        {
            var foods = _context.Foods.AsQueryable().Where(f => f.Name.ToLower().Contains(foodName.ToLower()));

            if (foods == null) return null;

            return await foods.ToListAsync();
        }

        public async Task<Food> UpdateFoodAsync(int id, UpdateFoodDto updateFoodDto)
        {
            var food = await _context.Foods.FirstOrDefaultAsync(x => x.Id == id);

            if(food == null) { return null; }

            food.Name = updateFoodDto.Name;
            food.Calories = updateFoodDto.Calories;
            food.Protein = updateFoodDto.Protein;
            food.Carbs = updateFoodDto.Carbs;
            food.Fats = updateFoodDto.Fats;

            await _context.SaveChangesAsync();
            return food;
        }
    }
}
