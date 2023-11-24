
using Amazon.S3;
using AutoMapper;
using BE_SOCIALNETWORK.Config;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Mapping;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Payload.Response;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.AspNetCore.Mvc;
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
        public UserService(IUnitOfWork unitOfWork, IOptions<JWTSettings> jwtSettings, IMapper mapper, IHttpContextAccessor httpContextAccessor, IS3Service s3Service)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.jWTSettings = jwtSettings.Value;
            this.httpContextAccessor = httpContextAccessor;
            this.s3Service = s3Service; 
        }

        public async Task<bool> FindByUsernameOrEmail(string username, string email)
        {
            var user = await unitOfWork.UserRepository.Find(t=>t.Username == username || t.Email == email, null);
            return user != null;
        }
        public async Task<bool> FindByUsername(string username)
        {
            var user = await unitOfWork.UserRepository.Find(t => t.Username == username , null);
            return user != null;
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

        public async Task<string> SignUp(string username, string password, string email, string fullName)
        {
            string hashPassword = SecretHasher.Hash(password);
            User user = new User
            {
                Username = username,
                Email = email,
                FullName = fullName,
                Password = hashPassword
            };
            var rs = await unitOfWork.UserRepository.AddAsync(user);
            unitOfWork.CommitAsync();
            return rs.Username;
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
