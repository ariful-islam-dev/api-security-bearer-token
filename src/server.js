const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use([cors(), morgan("dev"), express.json()]);
app.use('/auth', require('./authRoutes'))
app.use('/', require('./appRoutes'))

app.use("/health", (_req, res) => {
  res.status(200).json({
    message: "Health Route get Successful",
  });
});

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
    });
  } else {
    return res.status(500).json({
      error: "Something Went Wrong",
    });
  }
});

const PORT = process.env.PORT || 4000;
mongoose.connect("mongodb://localhost:27017/api-security").then(() => {
  console.log("Database Connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
