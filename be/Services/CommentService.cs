using AutoMapper;
using BE_SOCIALNETWORK.Config;
using BE_SOCIALNETWORK.Database;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Xml.Linq;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class CommentService : ICommentService
    {

        private readonly IUnitOfWork unitOfWork;
        private readonly PageSettings pageSettings;
        private readonly IMapper mapper;
        public CommentService(IUnitOfWork unitOfWork, IOptions<PageSettings> pageSettings, IMapper mapper)
        {
            this.mapper = mapper;
            this.pageSettings = pageSettings.Value;
            this.unitOfWork = unitOfWork;
        }
        public async Task<PaginatedItems<CommentDto>> ListAsyncPageByIdPost(int pageIndex, int idPost)
        {
            var page = await unitOfWork.CommentRepository.PageAsync(pageIndex, pageSettings.Size, f => f.PostId == idPost, null, i => i.Include(f=>f.User).Include(f=>f.Medias).Include(f=>f.CommentParent));
            return mapper.Map<PaginatedItems<CommentDto>>(page);
        }
        public async Task<CommentDto> CreateComment(CreateCommentRequest comment, List<MediaDto> medias, int userId)
        {
            var userInfo = await unitOfWork.UserRepository.Find(f => f.Id == userId);
            if(userInfo == null)
            {
                return null;
            }

            Comment commentEntity = new Comment
            {
                PostId = comment.IdPost,
                UserId = userId,
                ParentId = comment.IdParent == -1 ? null : comment.IdParent,
                Content = comment.Content,
                CreatedDate = DateTime.Now
            };

            List<MediaComment> mediasEntity = new List<MediaComment>();
            foreach (var media in medias)
            {
                mediasEntity.Add(new MediaComment
                {
                    CreatedDate = DateTime.UtcNow,
                    Src = media.Src,
                    Type = media.Type,
                });
            }
            commentEntity.Medias = mediasEntity;
            var entity = await unitOfWork.CommentRepository.AddAsync(commentEntity);
            await unitOfWork.CommitAsync();
            if(entity != null)
            {
                entity.User = userInfo;
                return mapper.Map<CommentDto>(entity);
            }
            return null;
        }
        public bool RemoveCommentByPost(int id)
        {
            var listComment = unitOfWork.Social_NetworkContext.Comment.Where(f=>f.PostId == id).ToList(); 
            var rs = new List<Comment>(listComment);
            foreach (var comment in listComment)
            {
                rs.AddRange(GetRangeComment(comment.Id));
                
            }
            unitOfWork.Social_NetworkContext.Comment.RemoveRange(rs.ToList());
            unitOfWork.Commit();
            return true;
        }
        public async Task<bool> RemoveComment(int idComment)
        {
                var comment = await unitOfWork.CommentRepository.Find(f=>f.Id == idComment);
                if(comment == null)
                {
                return true;
                }
            var descendantComments = GetRangeComment(comment.Id);
            descendantComments.Add(comment);
            unitOfWork.Social_NetworkContext.Comment.RemoveRange(descendantComments.ToList());

            unitOfWork.Commit();
            return true;
        }

        public List<Comment> GetRangeComment(int id)
        {
           
            var descendantComments = unitOfWork.Social_NetworkContext.Comment
                   .Where(c => c.ParentId == id)
                   .ToList();
            var rs = new List<Comment>(descendantComments);
            foreach (var comment in descendantComments)
            {
                var tmp = GetRangeComment(comment.Id).ToList();
                rs.AddRange(tmp);
            }
            return rs;
        }
        public async Task<CommentDto> FindById(int id)
        {
            var comment = await unitOfWork.CommentRepository.Find(f=>f.Id == id, i=>i.Include(f=>f.CommentParent));
            return mapper.Map<CommentDto>(comment);
        }

       
    }
}
