using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BE_SOCIALNETWORK.Database.Contracts
{
    public class Media : BaseModel
    {
        public string Src { get; set; }
        public string Type { get; set; }

    }
}
