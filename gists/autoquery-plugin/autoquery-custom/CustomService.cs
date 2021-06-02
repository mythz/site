// Return CustomRockstar result to control what the service returns
// Join with other tables
[Route("/rockstar-albums")]
public class QueryRockstarAlbums
  : QueryDb<Rockstar,CustomRockstar>, IJoin<Rockstar,RockstarAlbum>
{
    public int? Age { get; set; }
    public string RockstarAlbumName { get; set; }
}

// Custom result
public class CustomRockstar
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }

    // Comes from joined table
    public string RockstarAlbumName { get; set; }
}

// Override with custom implementation
public class MyQueryServices : Service
{
    public IAutoQueryDb AutoQuery { get; set; }

    public async Task<object> Any(QueryRockstarAlbums query)
    {
        using var db = AutoQuery.GetDb(query, base.Request);
        var q = AutoQuery.CreateQuery(query, base.Request, db);
        return await AutoQuery
                        .ExecuteAsync(query, q, base.Request, db);
    }
}