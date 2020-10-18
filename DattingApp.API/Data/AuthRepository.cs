using System;
using System.Linq;
using System.Threading.Tasks;
using DattingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    { 
   private readonly DataContext _context;
    public AuthRepository( DataContext context)
    {
        _context = context;
    }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Username == username);
            if(user == null)
            return null;
            if (!VerifyPasswordHarsh(password, user.PasswordHarsh, user.PasswordSalt))
            return null;
            return user;
        }

        private bool VerifyPasswordHarsh(string password, byte[] passwordHarsh, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHarsh = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int a = 0; a < computeHarsh.Length; a++)
                {
                    if(computeHarsh[a] != passwordHarsh[a]) return false;
                }
           }
           return true;
        }

        public async Task<User> Register(User user, string password)
        {
          byte[] passwordHarsh, passwordSalt;
          CreatePasswordHarsh(password, out passwordHarsh, out passwordSalt);

          user.PasswordHarsh = passwordHarsh;
          user.PasswordSalt = passwordSalt;

          await _context.User.AddAsync(user);
          await _context.SaveChangesAsync();
          return user;
        }

        private void CreatePasswordHarsh(string password, out byte[] passwordHarsh, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHarsh = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExist(string username)
        {          
            if(await _context.User.AnyAsync(x  => x.Username == username))
            return true;
            return false;
        }
    }
}