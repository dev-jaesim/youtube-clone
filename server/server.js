const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config");
const port = config.PORT;
const mongodbURL = config.MONGODB_URL;
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is successfully connected"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Server is currently running");
});

app.use("/uploads", express.static("uploads"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/videos", require("./routes/videoRoute"));
app.use("/api/subscriptions", require("./routes/subscriptionRoute"));

app.listen(port, () => console.log(`The server is running on the ${port}`));
