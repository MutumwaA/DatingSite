using DattingApp.API.Models;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Threading.Tasks;



namespace DattingApp.API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext _context)
        {
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach ( var user in users)
            {
               using var hmac = new System.Security.Cryptography.HMACSHA512();
                user.PasswordHarsh = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Password"));;
                user.PasswordSalt = hmac.Key;
                user.Username = user.Username.ToLower();
                _context.User.Add(user);

            }
            _context.SaveChanges();
        }
    }
}
