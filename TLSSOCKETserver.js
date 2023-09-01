"use strict";
const tls = require("tls");
const fs = require("fs");
const port = 1337;
const host = "127.0.0.1";
const { Socket } = require("dgram");
let Files = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("public-cert.pem"),
};
const server = tls.createServer(Files, (Socket) => {
  Socket.write("I am the server sending you a message");
  Socket.on("data", (data) => {
    console.log(data);
  });
  Socket.on("end", () => {
    console.log("EOT(end of transmission)");
  });
});
server.listen(port, host, () => {
  console.log(`Iam listening at ${host} on port ${port}`);
});
