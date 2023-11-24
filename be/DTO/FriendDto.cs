using BE_SOCIALNETWORK.Database.Contracts;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_SOCIALNETWORK.DTO
{
    public class FriendDto : BaseModel
    {
        public int UserRequestId { get; set; }
        public int UserAcceptId { get; set; }
        public int Status { get; set; }
        public InfoUserDto UserRequest { get; set; }
        public InfoUserDto UserAccept { get; set; }
    }
}
