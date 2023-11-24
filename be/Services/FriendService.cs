using AutoMapper;
using BE_SOCIALNETWORK.Config;
using BE_SOCIALNETWORK.Database;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using parking_center.Extensions;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class FriendService : IFriendService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly PageSettings pageSettings;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        public FriendService(IUnitOfWork unitOfWork, IOptions<PageSettings> pageSettings, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.mapper = mapper;
            this.pageSettings = pageSettings.Value;
            this.unitOfWork = unitOfWork;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<PaginatedItems<FriendDto>> ListAsyncPageByIdUser(int pageIndex, int idUser)
        {
            var page = await unitOfWork.FriendRepository.PageAsync(pageIndex, pageSettings.Size, f => f.UserRequestId == idUser || f.UserAcceptId == idUser, null, i => i.Include(f => f.UserAccept).Include(f => f.UserRequest));
            return mapper.Map<PaginatedItems<FriendDto>>(page);
        }

        public async Task<FriendDto> AcceptFriend(int idFriend)
        {
            var me = httpContextAccessor.HttpContext.GetUser();
            var friend = await unitOfWork.FriendRepository.Find(f => (f.UserRequestId == idFriend && f.UserAcceptId == me.Id) );
            if(friend == null)
            {
                return null;
            }
            friend.Status = 1;
            unitOfWork.FriendRepository.Update(friend);
            unitOfWork.Commit();
            return mapper.Map<FriendDto>(friend);
        }

        public async Task<FriendDto> CreateRequestFriend(int idUserRequest, int idUserAccept)
        {
            var friend = await unitOfWork.FriendRepository.Find(f => (f.UserRequestId == idUserRequest && f.UserAcceptId == idUserAccept) || (f.UserAcceptId == idUserRequest && f.UserRequestId == idUserAccept));
            if(friend != null)
            {
                friend.Status = 1;
                unitOfWork.FriendRepository.Update(friend);
                unitOfWork.Commit();
                return mapper.Map<FriendDto>(friend);
            }
            var accept = await unitOfWork.UserRepository.Find(f => f.Id == idUserAccept);
            if (accept == null) return null;
            var entity = await unitOfWork.FriendRepository.AddAsync(new Friend
            {
                UserAcceptId = idUserAccept,
                UserRequestId = idUserRequest,
                Status = 0
            });
            await unitOfWork.CommitAsync();
            if(entity != null) return mapper.Map<FriendDto>(entity);
            return null;
        }

        public async Task<bool> RejectFriend(int idRequest, int idAccept)
        {
            try
            {
                var friend = await unitOfWork.FriendRepository.Find(f=>(f.UserRequestId == idRequest && f.UserAcceptId == idAccept) || f.UserAcceptId == idRequest && f.UserRequestId == idAccept);
                if(friend == null) return false;

                unitOfWork.FriendRepository.Delete(friend.Id);
                unitOfWork.Commit();
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }


        }


        public async Task<List<FriendDto>> GetAllFriendByUser(int idUser)
        {
            var rs = await unitOfWork.FriendRepository.ListAsync(f=>(f.UserRequestId == idUser || f.UserAcceptId == idUser) && f.Status == 1,null, f=>f.Include(a=>a.UserAccept).Include(a=>a.UserRequest) );
            return mapper.Map<List<FriendDto>>(rs.ToList());
        }
        public async Task<List<FriendDto>> GetAllRequestFriend(int idUser)
        {
            var rs = await unitOfWork.FriendRepository.ListAsync(f => f.UserAcceptId == idUser && f.Status == 0, null, f => f.Include(a => a.UserAccept).Include(a => a.UserRequest));
            return mapper.Map<List<FriendDto>>(rs.ToList());
        }

      
    }
}
