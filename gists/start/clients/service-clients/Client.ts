import { JsonServiceClient } from 'servicestack-client';
import { Hello } from './web.dtos';

var client = 
    new JsonServiceClient("https://web.web-templates.io");
var request = new Hello();
request.Name = "World!";

var res = await client.get(request); //res:HelloResponse