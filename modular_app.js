const express = require("express");
const greetMiddleware = require("./greet.js");
/*express()
  .use("/api/v1", greetMiddleware({ greeting: " hello Romanozzi" }))
  .listen(8080);
*/
class GreetingService {
  constructor(greeting = "hello ") {
    this.greeting = greeting;
  }
  createGreeting(name) {
    return `${this.greeting} , ${name} !`;
  }
}
express()
  .use(
    "/api/v1/s1",
    greetMiddleware({
      service: new GreetingService(),
    })
  )
  .use(
    "/api/v1/s2",
    greetMiddleware({
      service: new GreetingService("hi"),
    })
  )
  .listen(8080);
