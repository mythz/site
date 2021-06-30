public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly){}

    public override void Configure(Container container)
    {
        container.Register<IRedisClientsManager>(c => 
            new RedisManagerPool("localhost:6379"));

        container.Register(c =>
            c.Resolve<IRedisClientsManager>().GetCacheClient());
    }
}