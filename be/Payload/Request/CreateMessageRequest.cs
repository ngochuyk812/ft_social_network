
namespace BE_SOCIALNETWORK.Payload.Request
{
    public class CreateMessageRequest
    {
        public string Message { get; set; }
        public int Room { get; set; }
        public List<IFormFile> Files { get; set; }

    }
}