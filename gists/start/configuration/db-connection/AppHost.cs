public class AppHost : AppHostBase
{
    public AppHost() : base("Web", 
        typeof(MyServices).Assembly) { }

    public override void Configure(Container container)
    {
        var connectionString =
            "Server=127.0.0.1;Port=5432;" +
            "Database=myDataBase;User Id=myUsername;" +
            "Password=myPassword;";
            
        container.Register<IDbConnectionFactory>(
            new OrmLiteConnectionFactory(
                connectionString,
                PostgreSqlDialect.Provider));
        
        using var db = container
            .Resolve<IDbConnectionFactory>()
            .Open();
            
        if (db.CreateTableIfNotExists<MyTable>())
        {
            db.Insert(
                new MyTable
                {
                    Name = "Seed Data for new MyTable"
                });
        }
    }
}