// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const courseSchema = new Schema({
//   course: { type: String, required: true },
//   name: { type: String, required: false },
//   prerequisites: { type: [String], default: [] },
// });

// const Course = mongoose.model("Course", courseSchema);
// module.exports = Course;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course: String,
  name: String,
  prerequisites: [String],
});

// module.exports = mongoose.model("course", courseSchema);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
