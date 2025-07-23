using FitnessAntrenmanPlatform.Data;
using FitnessAntrenmanPlatform.Dtos.MetabolismDtos;
using FitnessAntrenmanPlatform.Dtos.UserDtos;
using FitnessAntrenmanPlatform.Interfaces;
using FitnessAntrenmanPlatform.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace FitnessAntrenmanPlatform.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;
        public static string NormalizeUserName(string firstName, string lastName)
        {
            string fullName = firstName + lastName;
            fullName = fullName.ToLower();

            fullName = fullName.Replace("ş", "s")
                               .Replace("ı", "i")
                               .Replace("ğ", "g")
                               .Replace("ç", "c")
                               .Replace("ü", "u")
                               .Replace("ö", "o");

            return fullName;
        }
        public UserRepository(UserManager<AppUser> userManager,AppDbContext context) 
        {
            _userManager = userManager;
            _context = context; 
        }
        public async Task<AppUser?> GetUserByIdAsync(string id)
        {
            AppUser user = await _userManager.FindByIdAsync(id);

            return user == null ? null : user;
        }

        public async Task<AppUser?> UpdateUserAsync(string id, UpdateQuery updateQuery)
        {
            AppUser user = await _userManager.FindByIdAsync(id);

            if (user == null) { return null; }

            user.FirstName = updateQuery.FirstName;
            user.LastName = updateQuery.LastName;
            user.PhoneNumber = updateQuery.PhoneNumber;
            user.Age = updateQuery.Age;
            user.Height = updateQuery.Height;
            user.Weight = updateQuery.Weight;
            user.DateOfBirth = updateQuery.DateOfBirth;
            user.FitnessGoal = updateQuery.FitnessGoal;

            user.UserName = NormalizeUserName(updateQuery.FirstName, updateQuery.LastName);

            var updateResult = await _userManager.UpdateAsync(user);

            return updateResult.Succeeded == true ? null : user;
        }


        public async Task<AppUser?> DeleteUserAsync(string id,string password)
        {
            AppUser? user = await _userManager.FindByIdAsync(id);

            var hasher = new PasswordHasher<IdentityUser>();

            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);

            if(result == PasswordVerificationResult.Success)
            {
                await _userManager.DeleteAsync(user);
                return user;
            }
            else
            {
                return null;
            }
            
        }

        public async Task<MetabolismInfo?> SaveMetabolismInfoAsync(MetabolismInfoDto metabolismInfoDto,string userId)
        {
            AppUser? user = await _userManager.FindByIdAsync(userId);

            if (user == null) { return null; }

            var metabolismInfo = await _context.MetabolismInfos.FirstOrDefaultAsync(x => x.UserId == user.Id);

            var newMetabolismInfo = new MetabolismInfo
            {
                UserId = user.Id,
                TDEE = metabolismInfoDto.TDEE,
                BMR = metabolismInfoDto.BMR,
                CalculatedAt = DateTime.UtcNow,
            };

            if (metabolismInfo == null)
            {
                await _context.MetabolismInfos.AddAsync(newMetabolismInfo);
            }
            else
            {
                _context.MetabolismInfos.Remove(metabolismInfo);
                await _context.MetabolismInfos.AddAsync(newMetabolismInfo);
            }

            await _context.SaveChangesAsync();

            return newMetabolismInfo;
        }

        public async Task<MetabolismInfo?> GetMetabolismInfoAsync(string userId)
        {
            AppUser? user = await _userManager.FindByIdAsync(userId);

            if(user == null) { return null;}

            MetabolismInfo? metabolismInfo = await _context.MetabolismInfos.FirstOrDefaultAsync(x => x.UserId == user.Id);

            if(metabolismInfo == null) { return null; }

            return metabolismInfo;
        }
    }
}
