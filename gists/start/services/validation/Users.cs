[Route("/users", "POST")]
public class CreateUser : IReturn<User>
{
    public string Name { get; set; }
    public string Company { get; set; }
    public int Age { get; set; }
    public int Count { get; set; }
    public string Address { get; set; }
}

public class User
{
    [AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Company { get; set; }
    public int Age { get; set; }
    public int Count { get; set; }
    public string Address { get; set; }
}

