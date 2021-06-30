var client = 
    new JsonServiceClient("https://web.web-templates.io");
HelloResponse response = 
    client.Get(new Hello { Name = "World!" });