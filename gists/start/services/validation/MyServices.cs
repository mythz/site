public class MyServices : Service
{
    public object Post(CreateUser request)
    {
        var id = Db.Insert(request.ConvertTo<User>());
        var user = Db.SingleById<User>(id);
        return user;
    }
}