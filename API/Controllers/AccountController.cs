using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.DTOs;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using API.Interfaces;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
        {
            if (this.UserNameIsTaken(dto.Username).Result) return BadRequest("User name already exist in the database");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = dto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = dto.Username,
                Token = _tokenService.CreateToken(user)
            };
        }
            
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(RegisterDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == dto.Username.ToLower());

            if (user == null) return Unauthorized("User does not exist");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)); 

           for (int i = 0; i < computedHash.Length; i++)
           {
               if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
           }

            return new UserDto
            {
                Username = dto.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserNameIsTaken(string userName)
        {
            return await _context.Users.AnyAsync(u => u.UserName.ToLower() == userName.ToLower());
        }
    }
}