using System;
using System.Reflection;
using Funq;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace WhyServiceStack
{
    class Refs
    {
        Refs()
        {
            new MyServices().Any(new Hello());
        }
    }


    [Route("/hello/{Name}")]
    public class Hello : IReturn<HelloResponse>
    {
        public string Name { get; set; }
    }

    public class HelloResponse
    {
        public string Result { get; set; }
    }


    public class MyServices : Service
    {
        public object Any(Hello request)
        {
            return new HelloResponse 
            {
                Result = $"Hi, {request.Name}!"
            };
        }
    }

    class Tests
    {
        public void Can_Call_Hello_Service_Url()
        {
            var client = new JsonServiceClient("https://localhost:5001");
            HelloResponse response = client.Get<HelloResponse>("/hello?Name=World");
            Console.WriteLine(response.Result); //Hi, World!
        }

        public void Can_Call_Hello_Service_Dti()
        {
            var client = new JsonServiceClient("https://localhost:5001");
            HelloResponse response = client.Get(new Hello { Name = "World" });
            Console.WriteLine(response.Result); //Hi, World!
        }
    }

    public enum RoomType
    {
        Single,
        Double,
        Queen,
        Twin,
        Suite,
    }

    public class BookingService1 : Service
    {
        public BookingService1()
        {
            new Booking();
            Post(new CreateBooking());
        }

        [Route("/bookings", "POST")]
        [ValidateHasRole("Employee")]
        public class CreateBooking : IReturn<IdResponse>
        {
            public string Name { get; set; }
            [ApiAllowableValues(typeof(RoomType))]
            public RoomType RoomType { get; set; }
            [ValidateGreaterThan(0)]
            public int RoomNumber { get; set; }
            public DateTime BookingStartDate { get; set; }
            public DateTime? BookingEndDate { get; set; }
            [ValidateGreaterThan(0)]
            public decimal Cost { get; set; }
            public string Notes { get; set; }
        }

        public class Booking 
        {
            [AutoIncrement]
            public int Id { get; set; }
            public string Name { get; set; }
            public RoomType RoomType { get; set; }
            public int RoomNumber { get; set; }
            public DateTime BookingStartDate { get; set; }
            public DateTime? BookingEndDate { get; set; }
            public decimal Cost { get; set; }
            public string Notes { get; set; }
            public bool? Cancelled { get; set; }
        }

        public object Post(CreateBooking request)
        {
            // Your business logic

            var id = Db.Insert(request.ConvertTo<Booking>(), selectIdentity:true);
            return new IdResponse { Id = id.ToString() };
        }

    }

    public class BookingService2 : Service
    {
        public BookingService2()
        {
            new CreateBooking();
        }

        [Route("/bookings", "POST")]
        [ValidateHasRole("Employee")]
        public class CreateBooking : IReturn<IdResponse>,
            ICreateDb<Booking>
        {
            public string Name { get; set; }
            [ApiAllowableValues(typeof(RoomType))]
            public RoomType RoomType { get; set; }
            [ValidateGreaterThan(0)]
            public int RoomNumber { get; set; }
            public DateTime BookingStartDate { get; set; }
            public DateTime? BookingEndDate { get; set; }
            [ValidateGreaterThan(0)]
            public decimal Cost { get; set; }
            public string Notes { get; set; }
        }

        class Booking {}
    }

    public class BookingService3 : Service
    {
        public BookingService3()
        {
            new Booking();
            new CreateBooking();
        }

        [Route("/bookings", "POST")]
        [ValidateHasRole("Employee")]
        [AutoApply(Behavior.AuditCreate)]
        public class CreateBooking : IReturn<IdResponse>,
            ICreateDb<Booking>
        {
            public string Name { get; set; }
            [ApiAllowableValues(typeof(RoomType))]
            public RoomType RoomType { get; set; }
            [ValidateGreaterThan(0)]
            public int RoomNumber { get; set; }
            public DateTime BookingStartDate { get; set; }
            public DateTime? BookingEndDate { get; set; }
            [ValidateGreaterThan(0)]
            public decimal Cost { get; set; }
            public string Notes { get; set; }
        }

        public class Booking : AuditBase
        {
            [AutoIncrement]
            public int Id { get; set; }
            public string Name { get; set; }
            public RoomType RoomType { get; set; }
            public int RoomNumber { get; set; }
            public DateTime BookingStartDate { get; set; }
            public DateTime? BookingEndDate { get; set; }
            public decimal Cost { get; set; }
            public string Notes { get; set; }
            public bool? Cancelled { get; set; }
        }
    }

    public class ChinookServices : Service
    {
        public ChinookServices()
        {
            new QueryCustomers();
        }

        [Route("/customers", "GET")]
        [Route("/customers/{CustomerId}", "GET")]
        public class QueryCustomers
            : QueryDb<Customers>, IGet
        {
            public long? CustomerId { get; set; }
        }

        public class Customers
        {
            [AutoIncrement]
            public long CustomerId { get; set; }

            [Required]
            public string FirstName { get; set; }

            [Required]
            public string LastName { get; set; }

            public string Company { get; set; }
            public string Address { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Country { get; set; }
            public string PostalCode { get; set; }
            public string Phone { get; set; }
            public string Fax { get; set; }
            [Required]
            public string Email { get; set; }

            public long? SupportRepId { get; set; }
        }
    }

    class AppHost : AppHostBase
    {
        public AppHost(string serviceName, params Assembly[] assembliesWithServices) 
            : base(serviceName, assembliesWithServices){}

        public override void Configure(Container container)
        {

            // Connect to your database
            container.AddSingleton<IDbConnectionFactory>(c =>
                new OrmLiteConnectionFactory(MapProjectPath("~/chinook.sqlite"), SqliteDialect.Provider));

            // Configure AutoQuery to Generate CRUD Services
            Plugins.Add(new AutoQueryFeature
            {
                MaxLimit = 1000,
                GenerateCrudServices = new GenerateCrudServices {
                    AutoRegister = true
                }
            });
        }
    }
}