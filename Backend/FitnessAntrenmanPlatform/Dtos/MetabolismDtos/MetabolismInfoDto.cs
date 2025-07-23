using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.Dtos.MetabolismDtos
{
    public class MetabolismInfoDto
    {
        public double BMR { get; set; } //Bazal metabolizma hızı.
        public double TDEE { get; set; } //Toplam alınması gereken kalori miktarı
        public DateTime CalculatedAt { get; set; } = DateTime.Now;
    }
}
