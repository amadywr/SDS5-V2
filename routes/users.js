const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")
// Load User model
const User = require("../models/User")
const Course = require("../models/Course")
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth")

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login")
})

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
)

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" })
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" })
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" })
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" })
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                )
                res.redirect("/users/login")
              })
              .catch((err) => console.log(err))
          })
        })
      }
    })
  }
})

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next)
})

// Logout
router.get("/logout", (req, res) => {
  req.logout()
  req.flash("success_msg", "You are logged out")
  res.redirect("/users/login")
})

router.get("/add-course", ensureAuthenticated, (req, res) => {
  res.render("add-course")
})

router.post("/add-course", async (req, res) => {
 
  const { name, description, atar, location, duration, price} = req.body
  const author = req.user._id

  const course = new Course({ name, description, atar, location, duration, price, author })

  await course.save()

  res.redirect("/dashboard")
})

router.get('/update-course/:id', async(req, res)=> {

  const course = await Course.findById(req.params.id)
  res.render('update-course', {course})
})

router.put('/update-course/:id', async(req, res)=>{

  const {name, description, atar, location, duration, price} = req.body

  // const course = await Course.findById(req.params.id)

  await Course.findByIdAndUpdate(req.params.id, {name, description, atar, location, duration, price})
  
  const course = await Course.findById(req.params.id)

  res.redirect('/dashboard')
})

module.exports = router
