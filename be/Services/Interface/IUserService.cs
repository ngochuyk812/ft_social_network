using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Payload.Response;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface IUserService
    {
        public Task<string> SignUp(string username, string password, string email, string fullName, string pathVerication);
        public Task<SignInResponse> SignIn(string username, string password);
        public Task<UserDto> FindByUsernameOrEmail(string username, string email);
        public Task<User> FindByUsername(string username);
        Task<List<InfoUserDto>> SearchUserByQuery(string query);
        Task<InfoUserDto> GetUserById(int id);
        Task<SignInResponse> UpdateUser(UpdateUserRequest request);
        Task<bool> VeriAccount(string token);
        Task<bool> UpdatePassword(string email, string password);


    }
}
