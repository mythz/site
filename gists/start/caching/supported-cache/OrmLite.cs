public class AppHost : AppHostBase
{
    public AppHost() : base("Web", 
        typeof(MyServices).Assembly) { }

    public override void Configure(Container container)
    {
        // Register OrmLite Db Factory if not already
        container.Register<IDbConnectionFactory>(c => 
            new OrmLiteConnectionFactory(connString, 
                SqlServerDialect.Provider)); 

        container.RegisterAs<OrmLiteCacheClient, 
                                ICacheClient>();

        // Create 'CacheEntry' RDBMS table if 
        // it doesn't exist already
        container.Resolve<ICacheClient>()
                                .InitSchema(); 
        
        // Alternatively, MS SQL Server Optimized 
        // cache can be used to improve the
        // performance of OrmLiteCacheClient
        container.Register<ICacheClient>(c => 
            new OrmLiteCacheClient
              <SqlServerMemoryOptimizedCacheEntry>());
    }
}