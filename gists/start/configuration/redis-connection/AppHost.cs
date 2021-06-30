public class AppHost : AppHostBase
{
    public AppHost() : base("Web", 
        typeof(MyServices).Assembly) { }
    
    public override void Configure(Container container)
    {
        var connectionString = "redis://localhost:6379";
        // Register client manager.
        container.Register<IRedisClientsManager>(
            new RedisManagerPool(connectionString)); 

        // Register client factory
        container.Register(c => 
            c.Resolve<IRedisClientsManager>().GetCacheClient());
    }
}