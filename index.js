const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const port = config.PORT;
const mongodbURL = config.MONGODB_URL;

const app = express();

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB is successfully connected"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Server is currently running");
});

app.listen(port, () => console.log(`The server is running on the ${port}`));
