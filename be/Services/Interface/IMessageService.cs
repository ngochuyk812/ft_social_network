using BE_SOCIALNETWORK.Database.Model;
using BE_SOCIALNETWORK.DTO;
using BE_SOCIALNETWORK.Extensions;
using BE_SOCIALNETWORK.Payload.Request;
using BE_SOCIALNETWORK.Repositories.Contracts;
using BE_SOCIALNETWORK.Repositories.IRespositories;

namespace BE_SOCIALNETWORK.Services.Interface
{
    public interface IMessageService
    {
        Task<PaginatedItems<MessageDto>> GetMessageByPage(int id, int page);
        Task<RoomDto> GetRoomById(int id);
        Task<MessageDto> GetMessageById(int id);
        Task<RoomDto> CreateRoom(List<int> ids);
        Task<List<RoomDto>> GetAllParticipantByUser();
        Task<MessageDto> UploadMessage(CreateMessageRequest body);
        Task<RoomDto> GetRoomOrCreate(int user);
    }
}
