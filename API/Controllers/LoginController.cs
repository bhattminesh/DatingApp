using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace API.Controllers
{
    public class LoginController : BaseApiController
    {
        private readonly DataContext _context;
        public LoginController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(RegisterDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == dto.Username.ToLower());

            if (user == null) return Unauthorized("User name does not exist");
            
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));

            for (int i =0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            return user;
        }

        private async Task<AppUser> GetUser(string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == userName.ToLower());
        }
    }
}