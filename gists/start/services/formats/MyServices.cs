public class MyServices : Service
{
    // HTML, JSON, CSV, XML and JSV enabled by default
    public object Any(Hello request) =>
        new HelloResponse {
            Result = $"Hello, {request.Name}"
        };
}