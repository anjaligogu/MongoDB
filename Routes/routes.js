const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseByName,
  getCoursesByPrerequisite,
} = require("/Users/administrator/MONGOOSE_FILES/mongoose-Assignment/queries.js");

// Route to get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Route to get a course by its name
router.get("/course", async (req, res) => {
  const { name } = req.query;
  try {
    const course = await getCourseByName(name);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

// Route to get courses by a specific prerequisite
router.get("/courses/prerequisite", async (req, res) => {
  const { prerequisite } = req.query;
  try {
    const courses = await getCoursesByPrerequisite(prerequisite);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

module.exports = router;
