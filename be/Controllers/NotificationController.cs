using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using parking_center.Extensions;

namespace BE_SOCIALNETWORK.Controllers;

[ApiController]
[Route("api/notification")]
public class NotificationController : ControllerBase
{
    private readonly INotificationService notificationService;
    public NotificationController(INotificationService notificationService)
    {
        this.notificationService = notificationService;
    }

    [Authorize]
    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetNotification()
    {
        var rs = await notificationService.GetNotification();
        return Ok(rs);
    }



   

}
