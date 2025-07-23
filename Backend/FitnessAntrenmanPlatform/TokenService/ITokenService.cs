using FitnessAntrenmanPlatform.Models;

namespace FitnessAntrenmanPlatform.TokenService
{
    public interface ITokenService
    {
        public Task<string> CreateTokenAsync(AppUser user);
        public Task<string> CreateRefreshTokenAsync();
    }
}
