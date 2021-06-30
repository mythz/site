public class ConfigureDb : 
    IConfigureServices, 
    IConfigureAppHost
{
    IConfiguration Configuration { get; }
    public ConfigureDb(IConfiguration configuration) => 
        Configuration = configuration;

    public void Configure(IServiceCollection services)
    {
        services.AddSingleton<IDbConnectionFactory>(
            new OrmLiteConnectionFactory(
                Configuration.GetConnectionString(
                    "DefaultConnection")
                ?? ":memory:",
                SqliteDialect.Provider));
    }

    public void Configure(IAppHost appHost)
    {
        appHost.GetPlugin<SharpPagesFeature>()?
            .ScriptMethods.Add(new DbScriptsAsync());

        // Create non-existing Table and add Seed Data Example
        // using var db = appHost
        //     .Resolve<IDbConnectionFactory>()
        //     .Open();
        // if (db.CreateTableIfNotExists<MyTable>())
        // {
        //     db.Insert(
        //         new MyTable
        //         {
        //             Name = "Seed Data for new MyTable"
        //         });
        // }
    }
}