"use strict ";
const tls = require("tls");
const fs = require("fs");
const { error } = require("console");
const port = 1337;
const host = "127.0.0.1";
const creds = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("public-cert.pem"),
  rejectUnauthorized: false,
};
const client = tls.connect(port, host, creds, () => {
  if (client.authorized) {
    console.log("connection is authorized by certificate authority");
  } else {
    console.log(
      "connection isn't authorized " + " " + client.authorizationError
    );
  }
  client.write("Test Message ");
});
client.on("data", (data) => {
  console.log("recieved data");
  client.end();
});
client.on("close", () => {
  console.log("connection closed ");
});
client.on("error", (error) => {
  console.error(error);
  client.destroy();
});
