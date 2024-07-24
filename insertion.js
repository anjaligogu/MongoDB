const express = require("express");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const Course = require("./Schema");

const app = express();
const PORT = 3000;

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost/seconddb");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error while connecting to DB:", error);
  }
}

// Route to import data from CSV file
app.get("/import", async (req, res) => {
  const courses = [];
  fs.createReadStream("course.csv")
    .pipe(csv())
    .on("data", (row) => {
      console.log("CSV Row:", row);
      const { Course, Name, Prerequisites } = row;
      console.log(
        `Course: ${Course}, Name: ${Name}, Prerequisites: ${Prerequisites}`
      );

      const prerequisites = Prerequisites
        ? Prerequisites.split(",").map((p) => p.trim())
        : [];
      console.log("Parsed Prerequisites Array:", prerequisites);

      courses.push({ course: Course, name: Name, prerequisites });
    })
    .on("end", async () => {
      console.log("CSV file processed");
      await connect();
      for (const courseData of courses) {
        console.log("Course Data to Save:", courseData);
        const { course, name, prerequisites } = courseData;
        const courseDoc = new Course({ course, name, prerequisites });
        await courseDoc.save();
      }
      console.log("Data imported successfully");
      mongoose.connection.close();
      res.send("Data imported successfully");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
