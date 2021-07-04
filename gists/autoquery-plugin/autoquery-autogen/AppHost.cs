// Connect your database
container.AddSingleton<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
    MapProjectPath("~/northwind.sqlite"), SqliteDialect.Provider));

// Configure AutoQuery to Generate CRUD services
Plugins.Add(new AutoQueryFeature {
    MaxLimit = 1000,
    GenerateCrudServices = new GenerateCrudServices {
        AutoRegister = true
    }
});