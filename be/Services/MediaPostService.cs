using AutoMapper;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.EntityFrameworkCore;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class MediaPostService : IMediaPostService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper mapper;

        public MediaPostService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public async Task<List<MediaPostDto>> GetMediaByUser(int userId)
        {
            var items =  _unitOfWork.Social_NetworkContext.MediaPost.Where(f=>f.Post.UserId == userId).ToList();
            return mapper.Map<List<MediaPostDto>>(items);
        }
    }
}
