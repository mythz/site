public class MyServices : Service
{
    public object Any(Hello request)
    {
        var name = Cache.Get<string>(key);
        return new HelloResponse {
            Result = $"Hello, {name}!"
        };
    }
    
    public async Task<object> Any(HelloAsync request)
    {
        var name = await CacheAsync.GetAsync<string>(key);
        return new HelloResponse {
            Result = $"Hello, {name}!"
        };
    }
}