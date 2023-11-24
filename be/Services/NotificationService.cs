using AutoMapper;
using BE_SOCIALNETWORK.Database;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using BE_SOCIALNETWORK.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using parking_center.Extensions;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class NotificationService : INotificationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly NotificationHub notificationHub;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        public NotificationService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, NotificationHub notificationHub, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            this.notificationHub = notificationHub;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<List<NotificationDto>> GetNotification() { 
            var me = httpContextAccessor.HttpContext.GetUser().Id;
            var rs = await _unitOfWork.NotificationRepository.ListAsync(f => f.ToId == me,
                o => o.OrderByDescending(f => f.CreatedDate)
                ,f => f.Include(f => f.From));
            return mapper.Map<List<NotificationDto>>(rs);
        }

      
        public async Task<NotificationDto> CreateNotification(Notification notification)
        {
            var me = httpContextAccessor.HttpContext.GetUser();
            if(notification.ToId == notification.FromId)
            {
                return null;
            }
            var rs = await _unitOfWork.NotificationRepository.AddAsync(notification);
            await _unitOfWork.CommitAsync();
            var data = mapper.Map<NotificationDto>(notification);
            await notificationHub.Notification(data.ToId, data);
            return mapper.Map<NotificationDto>(rs);
        }
    }
}
