import 'package:servicestack/client.dart';
import 'dtos.dart';

var client = 
    new JsonServiceClient("https://web.web-templates.io");
var response = 
    await client.get(new Hello(name:"World!"));