[Route("/contacts", "GET")]
[Route("/contacts/{Id}", "GET")]
public class GetContacts : IReturn<List<Contact>>
{ 
    public int? Id { get; set; }
}

[Route("/contacts/{Id}", "PATCH PUT")]
public class UpdateContact : IReturn<Contact>
{
    public int Id { get; set; }
}

[Route("/contacts/{Id}", "DELETE")]
public class DeleteContact : IReturnVoid
{
    public int Id { get; set; }
}