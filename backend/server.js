const express = require("express");
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
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
