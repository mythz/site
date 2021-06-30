public class MyServices : Service
{
    // HTML, JSON, CSV, XML and JSV enabled
    // and working by default.
    public object Any(Hello request)
    {
        return new HelloResponse
        {
            Result = $"Hello, {request.Name}"
        };
    }
}