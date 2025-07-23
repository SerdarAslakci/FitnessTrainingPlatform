using FitnessAntrenmanPlatform.Dtos.MetabolismDtos;
using FitnessAntrenmanPlatform.Dtos.UserDtos;
using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.Interfaces
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserByIdAsync(string id);
        Task<AppUser> UpdateUserAsync(string id,UpdateQuery updateQuery);
        Task<AppUser> DeleteUserAsync(string id,string password);
        Task<MetabolismInfo> SaveMetabolismInfoAsync(MetabolismInfoDto metabolismInfoDto,string userId);
        Task<MetabolismInfo> GetMetabolismInfoAsync(string userId);


    }
}
