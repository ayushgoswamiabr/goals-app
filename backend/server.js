const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectdb = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalsroute"));
app.use("/api/users", require("./routes/userroute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build"), { dotfiles: 'allow' }));
  app.get("*", (req, res) => {
    res.sendFile(__dirname, "../", "frontend", "build", "index.html");
  });
} else {
  app.get("/", (req, res) => res.send("please set to production"));
}
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
