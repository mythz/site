public class AppHost : AppHostBase
{
    public AppHost() : base("WebApp", 
        typeof(MyServices).Assembly) { }

    public override void Configure(Container container)
    {
        this.GlobalRequestFilters.Add(
            (req, res, requestDto) =>
            {
                var sessionId = 
                    req.GetCookieValue("user-session");
                if (sessionId == null)
                {
                    res.ReturnAuthRequired();
                }
            });

        this.RegisterTypedRequestFilter<Resource>(
            (res, response, dto) =>
            {
                var route = req.GetRoute();
                if (route != null &&
                    route.Path == "/tenant/{Name}/resource")
                {
                    dto.SubResourceName = "CustomResource";
                }
            });
    }
}