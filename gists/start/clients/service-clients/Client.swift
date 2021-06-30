var baseUrl = "https://web.web-templates.io";
var client = JsonServiceClient(baseUrl:baseUrl)

var request = Hello()
request.name = "World!"
let response = client.get(request);