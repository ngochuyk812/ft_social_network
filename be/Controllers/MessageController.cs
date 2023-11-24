using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using parking_center.Extensions;

namespace BE_SOCIALNETWORK.Controllers
{
    [ApiController]
    [Route("api/room")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService messageService;
        private readonly IS3Service uploadFieS3Service;

        public MessageController(IMessageService messageService, IS3Service uploadFieS3Service) {
            this.messageService = messageService;
            this.uploadFieS3Service = uploadFieS3Service;
        }

        [Authorize]
        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetParticipant()
        {
            var rs = await messageService.GetAllParticipantByUser();
            return Ok(rs);
        }

        [Authorize]
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetRoom(int id)
        {
            var rs = await messageService.GetRoomById(id);
            return Ok(rs);
        }

        [Authorize]
        [Route("getorcreate/{user}")]
        [HttpGet]
        public async Task<IActionResult> GetRoomOrCreate(int user)
        {
            var rs = await messageService.GetRoomOrCreate(user);
            return Ok(rs);
        }

        [Authorize]
        [Route("{id}/page/{page}")]
        [HttpGet]
        public async Task<IActionResult> GetMessageByRoom(int id, int page)
        {
            var rs = await messageService.GetMessageByPage(id, page);
            return Ok(rs);
        }

        [Authorize]
        [Route("send")]
        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromForm] CreateMessageRequest body)
        {
            
            var rs = await messageService.UploadMessage(body);
            if (rs != null)
            {
                return Ok(rs);
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
