// const passport = require("passport")
// const googleStrategy = require("passport-google-oauth20").Strategy
// const userModal = require("../modals/users")



// passport.use(
//     new googleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "https://lms-web-application-backend-e6yj.onrender.com/auth/google/callback",
//         passReqToCallback: true
//     },
//         async (req, accessToken, refreshToken, profile, done) => {
//             try {

//                 let user = await userModal.findOne({ googleId: profile.id });

//                 if (!user) {

//                     user = await userModal.create({
//                         googleId: profile.id,
//                         firstname: profile.name.givenName,
//                         lastname: profile.name.familyName,
//                         email: profile.emails[0].value,
//                         role: req.session.role || "student", 
//                     });
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 return done(error, null);
//             }
//         }

//     )
// )

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//     const user = await userModal.findById(id);
//     done(null, user);
// });

// module.exports = passport;