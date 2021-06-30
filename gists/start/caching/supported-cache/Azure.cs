public class AppHost : AppHostBase
{
    public AppHost() : base("Web", 
        typeof(MyServices).Assembly) { }

    public override void Configure(Container container)
    {
        container.Register<ICacheClient>(
            new AzureTableCacheClient(cacheConnStr));
    }
}