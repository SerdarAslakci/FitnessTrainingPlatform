using System.ComponentModel.DataAnnotations;

namespace FitnessAntrenmanPlatform.Dtos.FoodDtos
{
    public class FoodQuery
    {
        public string foodType {  get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int? minCalories { get; set; } = null;

        [Range(0, int.MaxValue)]
        public int? maxCalories { get; set; } = null;


    }
}
