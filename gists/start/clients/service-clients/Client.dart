import 'package:servicestack/client.dart';
import 'dtos.dart';

var baseUrl = "https://web.web-templates.io";
var client = new JsonServiceClient(baseUrl);
var response = await client.get(new Hello(name:"World!"));