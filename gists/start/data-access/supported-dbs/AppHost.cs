public class AppHost : AppHostBase
{
    public AppHost() : base("Web",typeof(MyServices).Assembly){}

    public override void Configure(Container container)
    {
        var connectionString =
            "Server=127.0.0.1;Port=5432;" +
            "Database=host;User Id=user;" +
            "Password=myPassword;";
            
        container.Register<IDbConnectionFactory>(
            new OrmLiteConnectionFactory(
                connectionString,
                PostgreSqlDialect.Provider));
    }
}