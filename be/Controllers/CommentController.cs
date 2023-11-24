using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using parking_center.Extensions;

namespace BE_SOCIALNETWORK.Controllers;

[ApiController]
[Route("api/comment")]
public class CommentController : ControllerBase
{
    private readonly ICommentService commentService;
    private readonly IPostService postService;

    private readonly IS3Service s3Service;
    private readonly INotificationService notificationService;

    public CommentController(ICommentService commentService, IS3Service s3Service, INotificationService notificationService, IPostService postService)
    {
        this.commentService = commentService;
        this.s3Service = s3Service;
        this.notificationService = notificationService; 
        this.postService = postService;
    }

    [HttpGet]
    [Route("post/{idPost}/page/{page}")]
    public async Task<IActionResult> GetCommentPageByIdPost(int page, int idPost)
    {
        var rs = await commentService.ListAsyncPageByIdPost(page, idPost);
        return Ok(rs);
    }

    [Authorize]
    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Comment([FromForm] CreateCommentRequest commentRequest)
    {
        UserDto user = HttpContext.GetUser();
        var dataMedia = new List<MediaDto>();
        if (commentRequest?.Files?.Count > 0)
        {
             dataMedia = await s3Service.UploadFilesToS3(commentRequest.Files, "comment");
        }

        var comment = await commentService.CreateComment(commentRequest, dataMedia, user.Id);
        if(comment == null) return BadRequest();
        var userByPost = await postService.FindById(comment.PostId);
        var type = Notification.NotificationType.Comment;
        var to = userByPost.UserId;

        if (comment.ParentId != null)
        {
            var getComment = await commentService.FindById(comment.Id);
            if (getComment != null)
            {
                type = Notification.NotificationType.Reply;
                to = getComment.CommentParent.UserId;

            }
        }
        await notificationService.CreateNotification(new Database.Model.Notification
        {
            FromId = user.Id,
            IdObj = comment.PostId,
            ToId = to,
            Type = type,
            IsRead = false,
        });
        return Ok(comment);
    }

    [Authorize]
    [HttpDelete]
    [Route("remove/{id}")]
    public async Task<IActionResult> RemoveComment( int id)
    {
        var rs = await commentService.RemoveComment(id);
        if (rs)
        {
            return Ok(rs);
        }
        return BadRequest();
    }



}
