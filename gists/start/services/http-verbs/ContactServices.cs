public class ContactServices
{
    public object Get(GetContacts request)
    {
        var contacts = request.Id == null ? 
            Db.Select<Contact>() :
            Db.Select<Contact>(x => x.Id == request.Id.ToInt());
        return contacts;
    }
    
    public object Any(UpdateContact request)
    {
        var contact = Db.SingleById<Contact>(request.Id);
        contact.PopulateWith(request);
        Db.Update(contact);
        return contact;
    }
    
    public void Delete(DeleteContact request) =>
        Db.Delete<Contact>(x => x.Id == request.Id);
}