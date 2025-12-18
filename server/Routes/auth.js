// const express = require("express")
// const passport = require("passport")
// const router = express.Router()
// const generateToken = require("../jsonToken/jwt")



// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login", session: false }),
//     (req, res) => {
//         const token = generateToken(req.user)
//         const userData = {
//             id: req.user._id,
//             email: req.user.email
//         }
//         const encodeUserData = Buffer.from(JSON.stringify(userData)).toString("base64")
//         res.redirect(`http://localhost:5174/login?token=${token}&user=${encodeUserData}`)
//     }
// )

// module.exports = router

