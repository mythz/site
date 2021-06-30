// @Route("/hello")
// @Route("/hello/{Name}")
public class Hello : IReturn, Codable
{
    public typealias Return = 
        HelloResponse

    public var name:String?

    required public init(){}
}

public class HelloResponse : Codable
{
    public var result:String?

    required public init(){}
}