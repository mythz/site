String baseUrl = "https://web.web-templates.io";
JsonServiceClient client = new JsonServiceClient(baseUrl);
HelloResponse = client.get(new Hello().setName("World!"));