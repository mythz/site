public class AppHost : AppHostBase
{
    public AppHost() : base("WebApp", 
        typeof(MyServices).Assembly) { }

    // Configure your AppHost with the necessary configuration
    // and dependencies your App needs
    public override void Configure(Container container)
    {
        container.Register<IBar>(
            new Bar
            {
                Name = "Registered as interface"
            });
        container.Register(
            new Bar
            {
                Name = "Registered as Concrete type"
            });
    }
}