public class dtos
{

    @Route("/hello")
    // @Route("/hello/{Name}")
    public static class Hello implements 
        IReturn<HelloResponse>
    {
        public String name = null;
        
        public String getName() { 
            return name; 
        }
        public Hello setName(String value) { 
            this.name = value; return this; 
        }
        private static Object responseType = 
            HelloResponse.class;
        public Object getResponseType() { 
            return responseType; 
        }
    }

    public static class HelloResponse
    {
        public String result = null;
        
        public String getResult() { 
            return result; 
        }
        public HelloResponse setResult(String value) { 
            this.result = value; return this; 
        }
    }
}