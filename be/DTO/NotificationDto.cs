using BE_SOCIALNETWORK.Database.Contracts;
using BE_SOCIALNETWORK.DTO;
using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace BE_SOCIALNETWORK.Database.Model
{
    public class NotificationDto : BaseModel
    {
        public enum NotificationType
        {
            Like,
            Comment,
            RequestFriend,
            Messages,
            Reply
        }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public virtual InfoUserDto From { get; set; }
        public virtual InfoUserDto To { get; set; }
        public int IdObj { get; set; }
        public NotificationType Type { get; set; }
        public bool IsRead { get; set; }


    }
}
