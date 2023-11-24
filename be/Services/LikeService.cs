﻿using AutoMapper;
using BE_SOCIALNETWORK.Config;
using BE_SOCIALNETWORK.Database;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class LikeService : ILikeService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly PageSettings pageSettings;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LikeService(IUnitOfWork unitOfWork, IOptions<PageSettings> pageSettings, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.mapper = mapper;
            this.pageSettings = pageSettings.Value;
            this.unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }
       public async Task<PaginatedItems<LikeDto>> ListAsyncPageByIdPost(int pageIndex, int idPost)
        {
            var page = await unitOfWork.LikeRepository.PageAsync(pageIndex, pageSettings.Size, f=>f.PostId == idPost, null, i=>i.Include(f=>f.LikeType).Include(f=>f.User));
            return mapper.Map<PaginatedItems<LikeDto>>(page);
        }
        public async Task<Like> CreateLike(int typeLike, int idPost, int idUser )
        {
            var item = await unitOfWork.LikeRepository.Find(f => f.PostId == idPost && f.UserId == idUser, i=>i.Include(f=>f.User).Include(f=>f.Post));
            if(item == null)
            {
                Like like = new Like
                {
                    Type = typeLike,
                    PostId = idPost,
                    UserId = idUser,
                    CreatedDate = DateTime.Now,
                };
                var rs = await unitOfWork.LikeRepository.AddAsync(like);
                await unitOfWork.CommitAsync();
                if (rs != null)
                    return rs;
                else
                    return null;
            }

            item.Type = typeLike;
            unitOfWork.LikeRepository.Update(item);
            unitOfWork.Commit();
            return item;

            
        }

        public async Task<bool> UnLike(int idPost, int idUser)
        {
            var item = await unitOfWork.LikeRepository.Find(f => f.PostId == idPost && f.UserId == idUser);
            if (item == null)
            {
                return true;
            }
            unitOfWork.LikeRepository.Delete(item.Id);
            unitOfWork.Commit();
            return true;
        }

        public async Task<List<LikeTypeDto>> GetLikeTypes()
        {
            string host = _httpContextAccessor.HttpContext.Request.Host.Value;
            var rs = await unitOfWork.LikeTypeRepository.ListAsync(f=>true, null, null);
            return mapper.Map<List<LikeTypeDto>>(rs.ToList()) ;  
        }
    }
}
