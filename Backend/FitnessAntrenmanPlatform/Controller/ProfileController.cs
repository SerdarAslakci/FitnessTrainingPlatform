using FitnessAntrenmanPlatform.Dtos.MetabolismDtos;
using FitnessAntrenmanPlatform.Dtos.UserDtos;
using FitnessAntrenmanPlatform.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FitnessAntrenmanPlatform.Controller
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController:ControllerBase
    {

        private readonly IUserRepository _userRepository;
        public ProfileController(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserById()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) { return Unauthorized(); }

                var user = await _userRepository.GetUserByIdAsync(userId);

                if (user == null) { return NotFound(); }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
            
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateUser(UpdateQuery updateQuery)
        {
            if(!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) { return Unauthorized(); }

                var user = await _userRepository.GetUserByIdAsync(userId);

                if (user == null) { return NotFound(); }

                var updatedUser = await _userRepository.UpdateUserAsync(user.Id, updateQuery);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount([FromBody] string password)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            
            if(string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Şifre alanı boş olamaz.");
            }
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) { return Unauthorized(); }

                var user = await _userRepository.DeleteUserAsync(userId,password);

                if (user == null) { return NotFound("Kullanıcı şifresi yanlış!!!");}

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("AddMetabolismInfo")]
        public async Task<IActionResult> AddMetabolismInfo([FromBody] MetabolismInfoDto metabolismInfoDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) { return Unauthorized(); }

                var metabolismInfo = await _userRepository.SaveMetabolismInfoAsync(metabolismInfoDto,userId);
                if (metabolismInfo == null)
                {
                    return NotFound();
                }
                return Ok(metabolismInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [Authorize]
        [HttpGet("GetMetabolismInfo")]
        public async Task<IActionResult> GetMetabolismInfo()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) { return Unauthorized(); }

                var metabolismInfo = await _userRepository.GetMetabolismInfoAsync(userId);
                if (metabolismInfo == null)
                {
                    return NotFound();
                }
                return Ok(metabolismInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
