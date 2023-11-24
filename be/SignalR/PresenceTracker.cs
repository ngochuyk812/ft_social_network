namespace BE_SOCIALNETWORK.SignalR
{
    public class ConnectionUser
    {
        public int idUser { get; set; }
        public string idConnect { get; set; }
    }

    public class PresenceTracker
    {
        private static  Dictionary<int, List<ConnectionUser>> OnlineUsers = new Dictionary<int, List<ConnectionUser>>();
        public static  Dictionary<int, string> UserConnect = new Dictionary<int, string>();

        public static void AddUserConnect(int user, string connect)
        {   
            UserConnect.Add(user, connect);
        }
        public static void UserDisconnect(int user)
        {
            UserConnect.Remove(user);
        }
        public static void AddUserOnline(ConnectionUser user, int idRoom)
        {
            if(OnlineUsers.ContainsKey(idRoom))
            {
                OnlineUsers[idRoom].Add(user);
            }
            else
            {
                OnlineUsers.Add(idRoom, new List<ConnectionUser> { user});
            }

        }
        public static string GetIdConnect(int id)
        {
            if(UserConnect.ContainsKey(id))
                return UserConnect[id];
            return "";
        }
        public static void RemoveUserOnline(int idUser, int idRoom)
        {
            if (OnlineUsers.ContainsKey(idRoom))
            {
                var conectionId = OnlineUsers[idRoom];

                var itemR = conectionId.FirstOrDefault(f => f.idUser == idUser);
                OnlineUsers[idRoom].Remove(itemR);
                if(OnlineUsers[idRoom].Count == 0)
                    OnlineUsers.Remove(idRoom);
            }



        }



    }
}
