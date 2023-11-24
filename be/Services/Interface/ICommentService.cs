using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Repositories.IRespositories;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface ICommentService
    {
        Task<PaginatedItems<CommentDto>> ListAsyncPageByIdPost(int pageIndex, int idPost);
        Task<CommentDto> CreateComment(CreateCommentRequest comment, List<MediaDto> media, int userId);
        Task<bool> RemoveComment(int idComment);
        Task<CommentDto> FindById(int id);
        List<Comment> GetRangeComment(int id);
        bool RemoveCommentByPost(int id);
    }
}
