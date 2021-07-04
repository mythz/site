// Connect your database
container.AddSingleton<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
    MapProjectPath("~/northwind.sqlite"), SqliteDialect.Provider));

// Add the AutoQuery Plugin
Plugins.Add(new AutoQueryFeature {
    MaxLimit = 1000
});