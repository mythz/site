public class MyServices : Service
{
    public object Any(Hello request)
    {
        // Db property opens a new connection per request
        var user = Db.Single<User>(x => x.Id == request.Id);
        return new HelloResponse {
            Result = $"Hello, {user.Name}!"
        };
    }
}