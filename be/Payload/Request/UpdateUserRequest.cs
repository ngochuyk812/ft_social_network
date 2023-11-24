
namespace BE_SOCIALNETWORK.Payload.Request
{
    public class UpdateUserRequest
    {
        public string PasswordNew { get; set; }
        public string FullName { get; set; }
        public IFormFile Avatar { get; set; }
        public IFormFile Banner { get; set; }
        public string Story { get; set; }

    }
}