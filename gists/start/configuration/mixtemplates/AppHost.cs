public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly){}

    // Configure your AppHost with the necessary configuration
    // and dependencies your App needs
    public override void Configure(Container container)
    {
        SetConfig(new HostConfig {
            DebugMode = AppSettings.Get(
                nameof(HostConfig.DebugMode), false)
        });
    }
}