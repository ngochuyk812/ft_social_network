using AutoMapper;
using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;
using Microsoft.EntityFrameworkCore;
using parking_center.Extensions;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IS3Service uploadFieS3Service;
        public MessageService(IUnitOfWork unitOfWork, IMapper mapper, IHttpContextAccessor httpContextAccessor, IS3Service uploadFieS3Service)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.uploadFieS3Service = uploadFieS3Service;
        }


        public async Task<RoomDto> CreateRoom(List<int> ids)
        {
            var type = 0;
            if (ids.Count > 2)
            {
                type = 1;
            }
            var par = new List<Participant>();
            foreach (var id in ids)
            {
                par.Add(new Participant
                {
                    UserId = id,
                });
            }
            var entity = new Room
            {
                Participants = par,
                Type = type
            };

            var rs = await unitOfWork.RoomRepository.AddAsync(entity);
            await unitOfWork.CommitAsync();
            return mapper.Map<RoomDto>(rs);

        }

        public async Task<List<RoomDto>> GetAllParticipantByUser()
        {
            var rs = await unitOfWork.RoomRepository.ListAsync(f => f.Participants.Any(a => a.UserId == httpContextAccessor.HttpContext.GetUser().Id), null, a => a.Include(f => f.Participants).ThenInclude(f => f.User).Include(f => f.Messages.OrderByDescending(m => m.CreatedDate).Take(1)).ThenInclude(f => f.MediaMessages).Include(f => f.Messages.OrderByDescending(m => m.CreatedDate).Take(1)).ThenInclude(f => f.User));
            return mapper.Map<List<RoomDto>>(rs);
        }

        public async Task<MessageDto> GetMessageById(int id)
        {
            var rs = await unitOfWork.MessageRepository.Find(f => f.Id == id, f => f.Include(f => f.User).Include(f => f.MediaMessages));
            return mapper.Map<MessageDto>(rs);
        }

        public async Task<PaginatedItems<MessageDto>> GetMessageByPage(int id, int page)
        {
            var rs = await unitOfWork.MessageRepository.PageAsync(page, 20, f => f.RoomId == id, o => o.OrderByDescending(f => f.CreatedDate), f => f.Include(f => f.MediaMessages).Include(f => f.User));
            rs.Data = rs.Data.Reverse();
            return mapper.Map<PaginatedItems<MessageDto>>(rs);
        }

        public async Task<RoomDto> GetRoomById(int id)
        {
            var rs = await unitOfWork.RoomRepository.Find(f => f.Id == id, a => a.Include(f => f.Participants).ThenInclude(f => f.User));
            if (rs != null)
            {
                return mapper.Map<RoomDto>(rs);
            }
            return null;
        }

        public async Task<RoomDto> GetRoomOrCreate(int user)
        {
            var userId = httpContextAccessor.HttpContext.GetUser().Id;
            var rs = await unitOfWork.RoomRepository.Find(f => f.Participants.Count() == 2
                                                            && f.Participants.Any(p => p.UserId == userId)
                                                            && f.Participants.Any(p => p.UserId == user),
                                                            a => a.Include(f => f.Participants).ThenInclude(f => f.User));
            if (rs != null)
            {
                return mapper.Map<RoomDto>(rs);
            }
            return mapper.Map<RoomDto>(await CreateRoom(new List<int> { userId, user }));
        }


        public async Task<MessageDto> UploadMessage(CreateMessageRequest body)
        {

            var userId = httpContextAccessor.HttpContext.GetUser();
            if (userId == null)
            {
                return null;
            }
            var room = await unitOfWork.RoomRepository.Find(f => f.Id == body.Room);
            if (room == null)
            {
                return null;
            }
            var path = new List<MediaDto>();
            if (body.Files != null)
            {
                path = await uploadFieS3Service.UploadFilesToS3(body.Files, "messages");
            }

            Message message = new Message
            {
                UserId = userId.Id,
                RoomId = room.Id,
                Status = 0,
                CreatedDate = DateTime.Now,
            };

            List<MediaMessage> medias = new List<MediaMessage>();
            foreach (var media in path)
            {
                medias.Add(new MediaMessage
                {
                    CreatedDate = DateTime.Now,
                    Src = media.Src,
                    Type = media.Type,
                });
            }
            if (!string.IsNullOrEmpty(body.Message))
                medias.Add(new MediaMessage
                {
                    CreatedDate = DateTime.Now,
                    Src = body.Message,
                    Type = "TEXT",
                });
            message.MediaMessages = medias;
            var entity = await unitOfWork.MessageRepository.AddAsync(message);
            await unitOfWork.CommitAsync();
            return mapper.Map<MessageDto>(entity);
        }
    }
}
