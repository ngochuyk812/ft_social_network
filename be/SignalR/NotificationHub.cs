using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using parking_center.Extensions;
using System.Diagnostics;

namespace BE_SOCIALNETWORK.SignalR
{
    [Authorize]
    public class NotificationHub : Hub
    {
        private IHttpContextAccessor _contextAccessor;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public NotificationHub(IHttpContextAccessor accessor, IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _contextAccessor = accessor;
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

        public async Task Send(int id, int message)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var messageService = scope.ServiceProvider.GetRequiredService<IMessageService>();
                var user = _contextAccessor.HttpContext.GetUser();
                var room = await messageService.GetRoomById(id);
                var mess = await messageService.GetMessageById(message);
                if (mess != null && mess.UserId == user.Id)
                {
                    foreach (var item in room.Participants)
                    {
                        var check = PresenceTracker.GetIdConnect(item.UserId);
                        if (!string.IsNullOrEmpty(check))
                        {
                            await Clients.Client(check).SendAsync("Receive", new SignalRType<MessageDto>
                            {
                                Type = SignalRType<MessageDto>.TypeEnum.Message,
                                Data = mess
                            });
                        }

                    }
                }
            }   
            
        }
        public async Task Notification(int id, NotificationDto notification)
        {
            var check = PresenceTracker.GetIdConnect(id );
            if (!string.IsNullOrEmpty(check))
            {
                await Clients.Client(check).SendAsync("Receive", new SignalRType<NotificationDto>
                {
                    Type = SignalRType<NotificationDto>.TypeEnum.Notification,
                    Data = notification
                });

            }
        }


    }
}
