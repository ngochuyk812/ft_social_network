﻿using BE_SOCIALNETWORK.Database;
using BE_SOCIALNETWORK.Repositories.Interface;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace BE_SOCIALNETWORK.Repositories.IRespositories
{
    public interface IUnitOfWork 
    {
        ICommentService CommentRepository { get; }
        IFriendRepository FriendRepository { get; }
        Social_NetworkContext Social_NetworkContext { get; }
        ILikeRepository LikeRepository { get; }
        IMediaCommentRepository MediaCommentRepository { get; }
        IMediaMessageRepository MediaMessageRepository { get; }
        IMediaPostRepository MediaPostRepository { get; }
        IMessageRepository MessageRepository { get; }
        IParticipantRepository ParticipantRepository { get; }
        IPostRepository PostRepository { get; }
        IRoomRepository RoomRepository { get; }
        IUserRepository UserRepository { get; }
        ILikeTypeRepository LikeTypeRepository { get; }
        NotificationRepository NotificationRepository { get; }

        void Commit();
        void Rollback();
        Task CommitAsync();
        Task RollbackAsync();
       
    }
}
