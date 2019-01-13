var express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./src/routes/crmRoutes");
const mongoose = require("mongoose");

// routes(app);

// app.use((req, res, next) => {
//   console.log("Time", Date.now());
// });

mongoose.connect(
  "mongodb://localhost/test",
  {
    useNewUrlParser: true
  }
);

const Cat = mongoose.model("Cat", { name: String });
const kitty = new Cat({ name: "mimi" });
kitty.save().then(res => {
  console.log(res);
  console.log("Meow");
});

app.get("/", (req, res) => {
  console.log("Request Method:", req.method);
});
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
