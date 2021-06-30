public interface IAddressValidator
{
    bool ValidAddress(string address);
}

public class AddressValidator : IAddressValidator
{
    public bool ValidAddress(string address)
    {
        return address != null
               && address.Length >= 20
               && address.Length <= 250;
    }
}

public class UserValidator : AbstractValidator<CreateUser>
{
    // Resolved from IoC
    public IAddressValidator AddressValidator { get; set; }

    public UserValidator()
    {
        //Validation rules for all requests
        RuleFor(r => r.Name).NotEmpty();
        RuleFor(r => r.Age).GreaterThan(0);
        RuleFor(x => x.Address).Must(x => 
            AddressValidator.ValidAddress(x));
    }
}