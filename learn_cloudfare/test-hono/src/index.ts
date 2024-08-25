import { Hono } from "hono";
import testMiddleware from "../middlewares/test";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "process";

// import { PrismaPg } from "@prisma/adapter-pg";
// import { log } from "console";
const app = new Hono();

app.get("/", (c) => {
  console.log("Request", c.req);
  console.log("Response", c.res);
  return c.text("Hello Hono!");
});

// Adding iddlewares in Hono
app.get("/test", testMiddleware, (c) => {
  return c.json({
    messge: "Hello this is a test route",
  });
});

// getting user input
app.post("/getauth", async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log("Headers: ", c.req.header("Authorization"));
  console.log("params: ", c.req.query("param"));
  console.log(c.res.bodyUsed);

  return c.text("Hello Hono!");
});

//Connecting to DB

app.get("/db", async (c) => {
  console.log("I am a context ", c);
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: { url: c.env.DATABASE_URL }, // connecting with the DB (and this c.env is comming right from Wrangler.TOML file)
      },
    }).$extends(withAccelerate());
    // console.log("Db operation");

    const createUser = await prisma.users_DB.create({
      data: {
        name: "Shishu",
        email: "hello12@123.com",
        password: "hello@123.com",
      },
    });

    return c.json({ mssg: "DB operation Compeleted", user: createUser });
  } catch (err) {
    // console.log(err);
    return c.text("DB operation failed");

    // console.log("DB operation failed ");
  }

  // c
  return c.json({
    mesg: "Hello From db route",
  });
});

export default app;
