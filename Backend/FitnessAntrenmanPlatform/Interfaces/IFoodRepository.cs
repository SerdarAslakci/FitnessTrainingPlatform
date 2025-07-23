using FitnessAntrenmanPlatform.Dtos.FoodDtos;
using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.Interfaces
{
    public interface IFoodRepository
    {
        Task<List<Food>> GetAllFoodsAsync(FoodQuery foodQuery);
        Task<List<Food>> GetFoodbByNameAsync(string foodName);
        Task<Food> DeleteFoodByIdAsync(int id);
        Task<Food>UpdateFoodAsync(int id,UpdateFoodDto updateFoodDto);
        Task<Food> AddFoodAsync(Food food);


    }
}
