using FitnessAntrenmanPlatform.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FitnessAntrenmanPlatform.Data
{
    public class AppDbContext:IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasIndex(u => u.NormalizedUserName)
                .IsUnique(false);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole()
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);



        }
        public DbSet<FitnessExercise> FitnessExercises { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<MetabolismInfo> MetabolismInfos { get; set; }
        public DbSet<WorkoutPlan> WorkoutPlans { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }

    }
}
