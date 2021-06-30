public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly){}

    public override void Configure(Container container)
    {
        GlobalRequestFilters.Add((req, res, requestDto) => {
            var sessionId = req.GetCookieValue("user-session");
            if (sessionId == null)
                res.ReturnAuthRequired();
        });

        RegisterTypedRequestFilter<Resource>((req, res, dto) =>
        {
            var route = req.GetRoute();
            if (route?.Path == "/tenant/{Name}/resource")
                dto.SubResourceName = "CustomResource";
        });
    }
}