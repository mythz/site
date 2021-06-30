public class MyServices : Service
{
    [NoNumbersInPath]
    public object Any(Hello request)
    {
        return new HelloResponse {
            Result = $"Hello, {request.Name}!"
        };
    }
}

public class NoNumbersInPathAttribute : RequestFilterAttribute
{
    public override void Execute(IRequest req, IResponse res, 
        object requestDto)
    {
        if (Regex.IsMatch(req.PathInfo, "[0-9]"))
            throw HttpError.BadRequest("No numbers");
    }
}