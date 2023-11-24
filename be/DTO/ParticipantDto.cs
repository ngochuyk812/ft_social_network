using BE_SOCIALNETWORK.Database.Contracts;
using BE_SOCIALNETWORK.DTO;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_SOCIALNETWORK.Database.Model
{
    public class ParticipantDto : BaseModel
    {
        public int RoomId { get; set; }
        public int UserId { get; set; }
        public InfoUserDto User { get; set; }  

    }
}
