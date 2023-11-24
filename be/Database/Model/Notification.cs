using BE_SOCIALNETWORK.Database.Contracts;
using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace BE_SOCIALNETWORK.Database.Model
{
    public class Notification : BaseModel
    {
        public enum NotificationType
        {
            Like,
            Comment,
            RequestFriend,
            AcceptFriend,
            Reply,
            Message
        }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public virtual User From { get; set; }
        public virtual User To { get; set; }
        public int IdObj { get; set; }
        public NotificationType Type { get; set; }
        public bool IsRead { get; set; }


    }
}
