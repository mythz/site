export class HelloResponse
{
    public result: string;

    public constructor(init?: Partial<HelloResponse>) { 
        (Object as any).assign(this, init); 
    }
}

// @Route("/hello")
// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>
{
    public name: string;

    public constructor(init?: Partial<Hello>) { 
        (Object as any).assign(this, init); 
    }
    public createResponse() { return new HelloResponse(); }
    public getTypeName() { return 'Hello'; }
}