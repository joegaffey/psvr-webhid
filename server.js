const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.set('Feature-Policy', "hid 'self'"); // Not working for glitch.com
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Listening on port " + listener.address().port);
});
