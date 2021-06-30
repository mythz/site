JsonServiceClient client = 
    new JsonServiceClient("https://web.web-templates.io");
HelloResponse = 
    client.get(new Hello().setName("World!"));