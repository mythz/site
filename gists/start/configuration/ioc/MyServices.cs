public class MyServices
{
    public IBar Bar { get; set; }
    
    public object Any(Hello request)
    {
        return new HelloResponse
        {
            Result = $"Hello, {Bar.Name}";
        }
    }
}