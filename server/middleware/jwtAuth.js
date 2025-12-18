const jwt = require("jsonwebtoken");
const User = require("../modals/users"); 


exports.authToken = async (req, res, next) => {
    try {
        const token = req.cookies.userToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
                isAuthentication: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_secret_key);
        const user = await User.findById(decoded.id); 
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                isAuthentication: false,
            });
        }

        req.user = user; 
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            isAuthentication: false,
        });
    }
};
exports.verifyAdmin = async (req, res, next) => {
  await exports.verifyUser(req, res, async () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  });
};
