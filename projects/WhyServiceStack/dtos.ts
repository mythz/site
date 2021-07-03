// ReSharper disable VariableCanBeMadeConst
// ReSharper disable StringLiteralWrongQuotes

/* Options:
Date: 2021-07-02 14:28:17
Version: 5.105
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://web.web-templates.io

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T> {
    createResponse(): T;
}

export interface IReturnVoid {
    createResponse(): void;
}

export class HelloResponse {
    public result: string;

    public constructor(init?: Partial<HelloResponse>) { (Object as any).assign(this, init); }
}

// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>
{
    public name: string;

    public constructor(init?: Partial<Hello>) { (Object as any).assign(this, init); }
    public createResponse() { return new HelloResponse(); }
    public getTypeName() { return 'Hello'; }
}

class JsonServiceClient { constructor(s: string) { } get(a:any): Promise<string> { return; } }

import { JsonServiceClient } from '@servicestack/client';

async function f() {
let a = '@servicestack/client';

let client = new JsonServiceClient('https://web.web-templates.io');
let response = await client.get(new Hello({ name: 'World' }));

}