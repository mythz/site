using System;
using ServiceStack;

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

}