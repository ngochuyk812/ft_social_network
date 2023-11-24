namespace BE_SOCIALNETWORK.DTO
{
    public class MediaDto
    {
        public string Src { get; set; }
        public string Type { get; set; }

        public static implicit operator string(MediaDto v)
        {
            throw new NotImplementedException();
        }
    }
}
