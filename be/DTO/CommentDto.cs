using BE_SOCIALNETWORK.Database.Contracts;
using BE_SOCIALNETWORK.Database.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BE_SOCIALNETWORK.DTO
{
    public class CommentDto : BaseModel
    {
        public int PostId { get; set; }
        public int? ParentId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
        public virtual CommentDto CommentParent { get; set; }
        public virtual InfoUserDto User { get; set; }
        public virtual ICollection<MediaCommentDto> Medias { get; set; }
        public DateTime CreateAt { get; set; }

    }
}