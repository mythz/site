public class AppHost : AppHostBase
{
    public AppHost() : base("WebApp",
        typeof(MyServices).Assembly)
    {
    }

    public override void Configure(Container container)
    {
        // Feature Plugin with default configuration
        Plugins.Add(new ValidationFeature());
        // Feature Plugin with custom configuration
        Plugins.Add(new AuthFeature(
            () => new CustomUserSession(),
            new IAuthProvider[] {
                new CredentialsAuthProvider(),
            }));
    }
}