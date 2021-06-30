var client = 
    JsonServiceClient(baseUrl: "https://web.web-templates.io")
var request = Hello()
request.name = "World!"
let response = client.get(request);