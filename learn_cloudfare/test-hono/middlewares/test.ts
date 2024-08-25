// import { Next } from "hono";
import { Context } from "hono/jsx";

async function testMiddleware(_:any,next:any) {
     
    console.log(_.req.url);
    console.log("This is a test testMiddleware");
    await next();
    console.log("Chaloo ji");
}


export default testMiddleware
