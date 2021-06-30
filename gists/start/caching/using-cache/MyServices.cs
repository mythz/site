[CacheResponse(Duration = 10, LocalCache = true)]
public class MyServices : Service
{
    public object Any(Hello request)
    {
        return new HelloResponse {
            Result = $"Hello, {request.Name}"
        };
    }
}