using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface IPostService
    {
        Task<CustomPostHomeDto> UploadPost(CreatePostRequest body, List<MediaDto> pathMedia);
        Task<PaginatedItems<CustomPostHomeDto>> ListAsyncPage(int pageIndex);
        Task<List<CustomPostHomeDto>> GetPostLiked();
        Task<PaginatedItems<CustomPostHomeDto>> ListAsyncPageWithUser(int pageIndex, int idUser);
        Task<PostDto> FindById(int id);
        Task<CustomPostHomeDto> FindCustomPostById(int id);
        bool RemovePost(int id);
    }
}
