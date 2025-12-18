// const jwt = require("jsonwebtoken")

// const generateToken = (user) => {
//     return jwt.sign(
//         {
//             id: user._id,
//             time: Date.now(),
//             email: user.email,
//             role: user.role,
//         },
//         process.env.JWT_SECRET_KEY, { expiresIn: "10min" }
//     )
// }

// module.exports = generateToken