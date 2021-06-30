var baseUrl = "https://web.web-templates.io";
var client = new JsonServiceClient(baseUrl);
var response = client.Get(new Hello { Name = "World!" });