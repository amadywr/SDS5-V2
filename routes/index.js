const express = require("express")
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth")
const recommender = require("../recommender")
const Course = require("../models/Course")

const fields = [
  "Maths",
  "IT",
  "Medicine",
  "Anthropology",
  "History",
  "Law",
  "Languages",
  "Philosophy",
  "Religion",
  "Economics",
  "Art",
]

// Welcome Page
router.get("/", (req, res) => {
  res.render("homepage")
})

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const courses = await Course.find()

  const courses1 = await courses.filter((course) =>
    course.author.equals(req.user._id)
  )

  res.render("dashboard", {
    user: req.user,
    courses: courses1,
  })
})

router.get("/preference", (req, res) => {
  res.render("preference", { fields })
})

router.post("/preference", (req, res) => {
  const userSelection = Object.values(req.body)

  res.render("result", {
    courses: recommender(userSelection),
  })
})

router.get("/courses", async (req, res) => {
  const courses = await Course.find()

  res.render("courses", { courses })
})

router.get("/courses/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).populate("author")

  res.render("course", { course })
})

router.delete("/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id)
  res.redirect("/dashboard")
})

module.exports = router
