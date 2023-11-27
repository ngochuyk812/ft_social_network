
using Amazon.S3;
using AutoMapper;
using BE_SOCIALNETWORK.Config;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Helper;
using BE_SOCIALNETWORK.Mapping;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Payload.Response;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using parking_center.Extensions;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly JWTSettings jWTSettings;
        private readonly IS3Service s3Service;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly MailUtils mailUtils;
        public UserService(IUnitOfWork unitOfWork, IOptions<JWTSettings> jwtSettings, IMapper mapper, IHttpContextAccessor httpContextAccessor, IS3Service s3Service, MailUtils mailUtils)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.jWTSettings = jwtSettings.Value;
            this.httpContextAccessor = httpContextAccessor;
            this.s3Service = s3Service;
            this.mailUtils = mailUtils;
        }

        public async Task<bool> FindByUsernameOrEmail(string username, string email)
        {
            var user = await unitOfWork.UserRepository.Find(t=>t.Username == username || t.Email == email, null);
            return user != null;
        }
        public async Task<User> FindByUsername(string username)
        {
            var user = await unitOfWork.UserRepository.Find(t => t.Username == username , null);
            return user ;
          
        }

        public async Task<SignInResponse> SignIn(string username, string password)
        {
            var user = await unitOfWork.UserRepository.Find(t => t.Username == username , null);
            if(user == null)
            {
                return null;
            }
            bool verity = SecretHasher.Verify(password, user.Password);
            if (!verity)
            {
                return null;
            }
            string token = GenerateJWT(user);
            var rs = mapper.Map<SignInResponse>(user);
            rs.AccessToken = token;
            return rs;
        }
        private string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jWTSettings.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,userInfo.Username),
                new Claim("Id",userInfo.Id + ""),
                new Claim(ClaimTypes.Email,userInfo.Email)
            };
            var token = new JwtSecurityToken(jWTSettings.Issuer,
                jWTSettings.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(jWTSettings.DurationInMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> SignUp(string username, string password, string email, string fullName, string pathVerication)
        {
            string hashPassword = SecretHasher.Hash(password);
            User user = new User
            {
                Username = username,
                Email = email,
                FullName = fullName,
                Password = hashPassword
            };
            try
            {
                var rs = await unitOfWork.UserRepository.AddAsync(user);
                var path = CreateLinkVeryAccount(rs);
                path = path.Replace(".", "-");
                path = $"{pathVerication}/{path}";
                mailUtils.SendMailGoogleSmtp("socical@gmail.com", email, "Kích hoạt tài khoản", "Vui lòng nhấn vào link để xác nhận đăng ký thành công"+ $"<br/> <a href='{path}'>Truy cập</a>").Wait();
                await unitOfWork.CommitAsync();
                return rs.Username;
            }
            catch (Exception ex) {
                return null;
            }

        }
        private string CreateLinkVeryAccount (User us )
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jWTSettings.Key + "Email"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,us.Username),
                new Claim("Id",us.Id + ""),

            };
            var token = new JwtSecurityToken(jWTSettings.Issuer + "Email",
                jWTSettings.Audience + "Email",
                claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: credentials);

            string tokenRS = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenRS;
        
        }

        public async Task<bool> VeriAccount(string token)
        {
            try
            {
                token = token.Replace("-", ".");
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jWTSettings.Key + "Email"));
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    IssuerSigningKey = key,
                    ValidIssuer = jWTSettings.Issuer + "Email",
                    ValidAudience = jWTSettings.Audience + "Email",
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var claims = jwtToken.Claims;
                var user = new UserDto
                {
                    Id = int.Parse(claims.First(f => f.Type == "Id").Value),
                    Username = claims.First(f => f.Type == ClaimTypes.Name).Value
                };
                var item = await unitOfWork.UserRepository.Find(f=>f.Username == user.Username && f.Status == 0);
                if (item == null) return false;
                item.Status = 1;
                unitOfWork.UserRepository.Update(item);
                unitOfWork.Commit();
                return true;
            }
            catch (Exception)
            {
                return false;

            }


        }

        public async Task<List<InfoUserDto>> SearchUserByQuery(string query)
        {
            query = query.Trim();
            var list = await unitOfWork.UserRepository.ListAsync(f => f.FullName.Contains(query) || f.Username.Contains(query) || f.Email.Contains(query));
            return mapper.Map<List<InfoUserDto>>(list);
        }

        public async Task<InfoUserDto> GetUserById(int id)
        {
            var idMe = httpContextAccessor.HttpContext.GetUser();
            if (idMe == null) return null;
            var item = await unitOfWork.UserRepository.Find(f => f.Id == id);
            var rs = mapper.Map<InfoUserDto>(item);
            
            var  friend = await unitOfWork.FriendRepository.Find(f=>(f.UserRequestId == idMe.Id && f.UserAcceptId == id) || (f.UserAcceptId == idMe.Id && f.UserRequestId == id));
            if(friend != null)
            rs.Friend = mapper.Map<FriendDto>(friend);
            if (item == null)
            {
                return null;
            }
            return rs;
        }

        public async Task<SignInResponse> UpdateUser(UpdateUserRequest request)
        {
            var id = httpContextAccessor.HttpContext.GetUser().Id;
            var user = await unitOfWork.UserRepository.Find(f => f.Id == id);
            if (user == null) return null;
            var pathAvatar = "";
            var pathBanner = "";
            if(request.Banner != null)
            {
                if (!string.IsNullOrEmpty(user.Banner))
                {
                    pathBanner = user.Banner.Split(".com/")[1].Split("?")[0];
                    pathBanner = (await s3Service.UploadFileToS3(request.Banner, "user", pathBanner, S3CannedACL.PublicRead)).Src;

                }
                else
                    pathBanner = (await s3Service.UploadFileToS3(request.Banner, "user",null,S3CannedACL.PublicRead)).Src;
                user.Banner = pathBanner;
            }
            if (request.Avatar != null)
            {
                if (!string.IsNullOrEmpty(user.Avatar))
                {
                    pathAvatar = user.Avatar.Split(".com/")[1].Split("?")[0];
                    pathAvatar = (await s3Service.UploadFileToS3(request.Avatar, "user", pathAvatar, S3CannedACL.PublicRead)).Src;
                }
                else
                    pathAvatar = (await s3Service.UploadFileToS3(request.Avatar, "user", null, S3CannedACL.PublicRead)).Src;

                user.Avatar = pathAvatar;
            }

            user.FullName = request.FullName;

            if(!string.IsNullOrEmpty(request.PasswordNew))
            {
                string hashPassword = SecretHasher.Hash(request.PasswordNew);
                user.Password = hashPassword;
            }
            user.Story = request.Story;
            unitOfWork.UserRepository.Update(user);
            unitOfWork.Commit();
            return mapper.Map<SignInResponse>(user);

        }
    }
}
