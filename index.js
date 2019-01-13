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

let getBlogByID = (req, res) => {
  blogModel.findById(req.params.blogId, (err, blogs) => {
    if (err) res.send(err);
    res.json(blogs);
  });
};

let updateBlog = (req, res) => {
  blogModel.findOneAndUpdate(
    { _id: req.params.blogId },
    req.body,
    { new: true },
    (err, updatedBlog) => {
      if (err) res.send(err);
      res.json(updateBlog);
    }
  );
};

app.get("/getBlogs", getAllBlogs);

app.get("/blog/:blogId", getBlogByID);

app.post("/newBlog", (req, res) => {
  let blog = new blogModel(req.body);
  blog.save((err, blogModel) => {
    if (err) res.send(err);
    res.json(blog);
  });
});

app.put("/blog/:blogId", updateBlog);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
