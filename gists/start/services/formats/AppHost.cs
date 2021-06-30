public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly){}

    public override void Configure(Container container)
    {
        // Add additional format support by using Plugins
        Plugins.Add(new MsgPackFormat());
    }
}