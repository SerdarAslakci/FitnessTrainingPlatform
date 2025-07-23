using System.ComponentModel.DataAnnotations;

namespace FitnessAntrenmanPlatform.Dtos.FoodDtos
{
    public class AddFoodDto
    {

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0, int.MaxValue)]
        public double Calories { get; set; } // Kalori değeri (100 gram başına)

        [Required]
        [Range(0, int.MaxValue)]
        public double Protein { get; set; } // Protein miktarı (gr)

        [Required]
        [Range(0, int.MaxValue)]
        public double Carbs { get; set; } // Karbonhidrat miktarı (gr)

        [Required]
        [Range(0, int.MaxValue)]
        public double Fats { get; set; } // Yağ miktarı (gr)
    }
}
