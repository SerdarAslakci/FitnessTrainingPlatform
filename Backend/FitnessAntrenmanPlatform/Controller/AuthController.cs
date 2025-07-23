using FitnessAntrenmanPlatform.Dtos.AuthDtos;
using FitnessAntrenmanPlatform.Models;
using FitnessAntrenmanPlatform.TokenService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessAntrenmanPlatform.Controller
{

    [ApiController]
    [Route("api/auth")]
    public class AuthController:ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

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

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,ITokenService tokenService)
        { 
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("ModelState incorrect");
            }

            try
            {
                var user = new AppUser
                {
                    UserName = NormalizeUserName(registerDto.FirstName.Trim(), registerDto.LastName.Trim()) + Guid.NewGuid().ToString().Substring(0, 6),
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    DateOfBirth = registerDto.DateOfBirth,
                    Age = registerDto.Age,
                    Height = registerDto.Height,
                    Weight = registerDto.Weight,
                    FitnessGoal = registerDto.FitnessGoal
                };


                var createUserResult = await _userManager.CreateAsync(user,registerDto.Password);
                
                if (createUserResult.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");

                    if(roleResult.Succeeded)
                    {
                        var token = await _tokenService.CreateTokenAsync(user);
                        var refreshToken = await _tokenService.CreateRefreshTokenAsync();
                        user.RefreshToken = refreshToken;
                        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);  //Refresh token 7 gün geçerli.

                        await _userManager.UpdateAsync(user);

                        return Ok(new NewUserDto()
                        {
                            UserName = user.UserName,
                            Email = user.Email,
                            Token = token,  
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUserResult.Errors);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var user = await _userManager.FindByEmailAsync(loginDto.Email);
                if (user == null) return Unauthorized("Girilen Email Adresi Yanlış!!!");

                var signInResult = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!signInResult.Succeeded) return Unauthorized("Parola Hatalı!!!");

                if(user.RefreshTokenExpiry < DateTime.UtcNow)
                {
                    var newRefreshToken = await _tokenService.CreateRefreshTokenAsync();
                    user.RefreshToken = newRefreshToken;
                    user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                    await _userManager.UpdateAsync(user);   
                }

                return Ok(new NewUserDto()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = await _tokenService.CreateTokenAsync(user),
                });

            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(string refreshToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken
                                && u.RefreshTokenExpiry > DateTime.UtcNow);

            if (user == null) return Unauthorized("Geçersiz veya süresi dolmuş refresh token");

            var newToken = await _tokenService.CreateTokenAsync(user);

            var newRefreshToken = await _tokenService.CreateRefreshTokenAsync();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            await _userManager.UpdateAsync(user);

            return Ok(new { Token = newToken, RefreshToken = newRefreshToken });
        }

    }
}
