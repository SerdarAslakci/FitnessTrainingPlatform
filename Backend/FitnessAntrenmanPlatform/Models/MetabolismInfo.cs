namespace FitnessAntrenmanPlatform.Models
{
    public class MetabolismInfo
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public double BMR { get; set; } //Bazal metabolizma hızı.
        public double TDEE { get; set; } //Toplam alınması gereken kalori miktarı
        public DateTime CalculatedAt { get; set; } = DateTime.Now;
        public AppUser? AppUser { get; set; }
    }
}
