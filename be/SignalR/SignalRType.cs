namespace BE_SOCIALNETWORK.SignalR
{
    public class SignalRType<T> where T : class
    {
        public enum TypeEnum
        {
            Message,
            Notification
        }
        public TypeEnum Type { get; set; }
        public T Data { get; set; }
    }
}
