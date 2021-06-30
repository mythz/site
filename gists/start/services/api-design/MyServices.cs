public class Contact 
{
    public int Id { get; set; }
    public string Name { get; set; }
}

[Route("/contacts")]
public class GetContacts : IReturn<List<Contact>> { }

public class ContactsService : Service
{
    public object Any(GetContacts request) => 
        Db.Select<Contact>();
}
