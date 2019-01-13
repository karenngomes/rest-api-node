var express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./src/routes/crmRoutes");

// routes(app);

// app.use((req, res, next) => {
//   console.log("Time", Date.now());
// });

app.get(
  "/",
  (req, res, next) => {
    console.log("Request Method:", req.method);
    next();
  },
  (req, res, next) => {
    console.log("Request Original Url", req.originalUrl);
    next();
  },
  (req, res, next) => {
    res.send("Request Was Sucessful");
  }
);
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
