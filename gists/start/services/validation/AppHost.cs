public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly){}

    public override void Configure(Container container)
    {
        Plugins.Add(new ValidationFeature());

        // Register custom validator
        container.Register<IAddressValidator>(
            new AddressValidator());
    }
}