public class AppHost : AppHostBase
{
    public AppHost() : base("Web", 
        typeof(MyServices).Assembly) { }

    public override void Configure(Container container)
    {
        var awsDb = new AmazonDynamoDBClient(
            Secrets.AWS_ACCESS_KEY, 
            Secrets.AWS_SECRET_KEY, 
            RegionEndpoint.USEast1);

        container.Register<IPocoDynamo>(new PocoDynamo(awsDb));
        container.Register<ICacheClient>(c => 
            new DynamoDbCacheClient(c.Resolve<IPocoDynamo>()));

        // Create 'CacheEntry' DynamoDB table if doesn't exist
        container.Resolve<ICacheClient>().InitSchema();
    }
}