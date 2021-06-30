@Route("/hello")
// @Route("/hello/{Name}")
open class Hello : IReturn<HelloResponse>
{
    var name:String? = null
    companion object { 
        private val responseType = 
            HelloResponse::class.java 
    }
    
    override fun getResponseType(): Any? = 
        Hello.responseType
}

open class HelloResponse
{
    var result:String? = null
}