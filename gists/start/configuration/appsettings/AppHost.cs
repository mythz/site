public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly)
    {
        var customSettings = new FileInfo("appsettings.txt");
        if (customSettings.Exists)
        {
            AppSettings = new TextFileSettings(customSettings.FullName);
        }
    }

    public override void Configure(Container container)
    {
        var redisHost = AppSettings.GetString("RedisHost");
        if (redisHost != null)
        {
            container.Register<IServerEvents>(c => 
                new RedisServerEvents(new PooledRedisClientManager(redisHost)));

            container.Resolve<IServerEvents>().Start();
        }
    }
}