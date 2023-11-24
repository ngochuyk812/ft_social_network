using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using BE_SOCIALNETWORK.DTO;
using parking_center.Extensions;
using Microsoft.AspNetCore.Authorization;
using BE_SOCIALNETWORK.Database.Model;

namespace BE_SOCIALNETWORK.Controllers;

[ApiController]
[Route("api/friend")]
public class FriendController : ControllerBase
{
    private readonly IFriendService friendService;  
    private readonly INotificationService notificationService;
    public FriendController(IFriendService friendService, INotificationService notificationService)
    {
        this.friendService = friendService;
        this.notificationService = notificationService; 
    }

    [HttpGet]
    [Route("{idUser}/page/{page}")]
    public async Task<IActionResult> GetFriendsByPage(int page, int idUser)
    {
        var rs = await friendService.ListAsyncPageByIdUser(page, idUser);
        return Ok(rs);
    }

    [HttpGet]
    [Route("{idUser}")]
    public async Task<IActionResult> GetFriendsByUser( int idUser)
    {
        var rs = await friendService.GetAllFriendByUser(idUser);
        return Ok(rs);
    }
    [Authorize]
    [HttpGet]
    [Route("request")]
    public async Task<IActionResult> GetRequestFriend()
    {
        UserDto user = HttpContext.GetUser();
        var rs = await friendService.GetAllRequestFriend(user.Id);
        
        return Ok(rs);
    }


    [Authorize]
    [HttpPost]
    [Route("create_request")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult> CreateRequestFriend([FromForm] int idUser)
    {
        UserDto user = HttpContext.GetUser();
        var rs = await friendService.CreateRequestFriend(user.Id, idUser);
        if (rs == null) return BadRequest();
        await notificationService.CreateNotification(new Database.Model.Notification
        {
            FromId = user.Id,
            ToId = idUser,
            IdObj = user.Id,
            Type = Database.Model.Notification.NotificationType.RequestFriend,
            IsRead = false,
        });
        return Ok(rs);
    }

    [Authorize]
    [HttpPost]
    [Route("accept")]
    [Consumes("application/x-www-form-urlencoded")]

    public async Task<IActionResult> AcceptFriend([FromForm] int idUser)
    {
        var rs = await friendService.AcceptFriend(idUser);
        if (rs != null)
        {
            UserDto user = HttpContext.GetUser();

            await notificationService.CreateNotification(new Database.Model.Notification
            {
                FromId = user.Id,
                ToId = idUser,
                IdObj = user.Id,
                Type = Database.Model.Notification.NotificationType.AcceptFriend,
                IsRead = false,
            });
            return Ok(rs);
        }
        

        return BadRequest();
    }

    [Authorize]
    [HttpPost]
    [Route("reject")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult> RejectFriend([FromForm] int idUser)
    {
        UserDto user = HttpContext.GetUser();

        var rs = await friendService.RejectFriend(idUser, user.Id);
        if (rs)
        {
            return Ok(rs);
        }
        return BadRequest();
    }

   
}
