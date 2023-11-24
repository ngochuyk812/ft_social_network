using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using System.Linq;
using System.Security.Claims;

namespace parking_center.Extensions
{
    public static class HttpContextExtensions
    {
        public static UserDto GetUser(this HttpContext source)
        {
            var claims = source.User.Claims;
            var idClaim = claims.FirstOrDefault(f => f.Type == "Id");
            var usernameClaim = claims.FirstOrDefault(f => f.Type == ClaimTypes.Name);
            if (idClaim != null && usernameClaim != null)
            {
                var id = idClaim.Value;
                var username = usernameClaim.Value;

                return new UserDto
                {
                    Id = int.Parse(id),
                    Username = username
                };
            }
            return null;
        }

    }
}
