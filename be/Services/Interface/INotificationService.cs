using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface INotificationService
    {
        Task<NotificationDto> CreateNotification(Notification notification);
        Task<List<NotificationDto>> GetNotification();

    }
}
