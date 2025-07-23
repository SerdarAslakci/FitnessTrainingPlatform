namespace FitnessAntrenmanPlatform.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Calories { get; set; } // Kalori değeri (100 gram başına)
        public double Protein { get; set; } // Protein miktarı (gr)
        public double Carbs { get; set; } // Karbonhidrat miktarı (gr)
        public double Fats { get; set; } // Yağ miktarı (gr)
    }
}
