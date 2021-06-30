public class AppHost : AppHostBase
{
    public AppHost() : base("WebApp",
        typeof(MyServices).Assembly)
    {
        var customSettings = new FileInfo("appsettings.txt");
        AppSettings = customSettings.Exists
            ? (IAppSettings)new TextFileSettings(customSettings.FullName)
            : new AppSettings();
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