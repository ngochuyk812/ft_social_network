﻿using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface IMediaPostService
    {
        public Task<List<MediaPostDto>> GetMediaByUser(int userId);
    }
}
