var client = new JsonServiceClient(baseUrl);

List<Contact> response = client.Get(new GetContacts());