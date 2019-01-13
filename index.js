var express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogSchema = require("./src/models/crmModels");
const blogModel = mongoose.model("blog", BlogSchema);

mongoose.connect(
  "mongodb://localhost/test",
  {
    useNewUrlParser: true
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let getAllBlogs = (req, res) => {
  blogModel.find({}, (err, blogs) => {
    if (err) res.send(err);
    res.json(blogs);
  });
};

app.get("/getBlogs", getAllBlogs);

app.post("/newBlog", (req, res) => {
  let blog = new blogModel(req.body);
  blog.save((err, blogModel) => {
    if (err) res.send(err);
    res.json(blog);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
