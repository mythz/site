import { JsonServiceClient } from 'servicestack-client';
import { Hello } from './web.dtos';

let baseUrl = "https://web.web-templates.io";
let client = new JsonServiceClient(baseUrl);

let request = new Hello({ name: 'World!' });
let response = await client.get(request); //res:HelloResponse