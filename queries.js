const Course = require("./Schema");

// Fetch all courses
async function getAllCourses() {
  return await Course.find();
}

// Fetch a course by its name
async function getCourseByName(name) {
  return await Course.findOne({ name });
}

// Fetch courses with a specific prerequisite
async function getCoursesByPrerequisite(prerequisite) {
  return await Course.find({ prerequisites: prerequisite });
}

module.exports = {
  getAllCourses,
  getCourseByName,
  getCoursesByPrerequisite,
};
