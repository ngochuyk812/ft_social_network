using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using parking_center.Extensions;
using System.Diagnostics;

namespace BE_SOCIALNETWORK.SignalR
{
    [Authorize]
    public class ChatHub: Hub
    {
        private IHttpContextAccessor _contextAccessor;
        private IMessageService messageService;
        public ChatHub(IHttpContextAccessor accessor, IMessageService messageService)
        {
            _contextAccessor = accessor;
            this.messageService = messageService;
        }
        public override Task OnConnectedAsync()
        {
            Debug.WriteLine("Connect", Context.ConnectionId);
            var user = _contextAccessor.HttpContext.GetUser();
            if (user != null) {
                PresenceTracker.AddUserConnect(user.Id, Context.ConnectionId);
            }
            return base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Debug.WriteLine("Disconnect", Context.ConnectionId);
            var user = _contextAccessor.HttpContext.GetUser();
            if (user != null)
            {
                PresenceTracker.UserDisconnect(user.Id);
            }
            await base.OnDisconnectedAsync(exception);

        }

        public async Task SendMessage(int id, int message)
        {
            var user = _contextAccessor.HttpContext.GetUser();
            var room = await messageService.GetRoomById(id);
            var mess = await messageService.GetMessageById(message);
            if(mess != null && mess.UserId == user.Id)
            {
                foreach (var item in room.Participants)
                {
                    var check = PresenceTracker.GetIdConnect(item.UserId);
                    if (!string.IsNullOrEmpty(check))
                    {
                        await Clients.Client(check).SendAsync("ReceiveMessage", mess);
                    }

                }
            }
        }

        public async Task Notfication(int id, Notification notification)
        {
            var check = PresenceTracker.GetIdConnect(id );
            if (!string.IsNullOrEmpty(check))
            {
                await Clients.Client(check).SendAsync("Notification", notification);

            }
        }


    }
}
