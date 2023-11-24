using BE_SOCIALNETWORK.Database.Contracts;
using BE_SOCIALNETWORK.Database.Model;

namespace BE_SOCIALNETWORK.DTO
{
    public class RoomDto : BaseModel
    {
        public string Name { get; set; }
        public int Type { get; set; }
        public IEnumerable<ParticipantDto> Participants { get; set; }
        public IEnumerable<MessageDto> Messages { get; set; }

    }
}
