const jwt = require("jsonwebtoken");
const Institution = require("../modals/Institution"); 


exports.instiAuthToken = async (req, res, next) => {
  try {
    const token = req.cookies.institutionToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
        isAuthentication: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_secret_key);

    const institution = await Institution.findById(decoded.id).select('_id institutionName adminFullName adminEmail');
    
    if (!institution) {
      return res.status(401).json({
        success: false,
        message: "Institution not found",
        isAuthentication: false,
      });
    }

    req.user = {
      _id: institution._id,
      role: "institution", 
      name: institution.adminFullName,
      email: institution.adminEmail,
      institutionName: institution.institutionName
    };

    next();
  } catch (err) {
    console.error("Institution auth error:", err);
    res.status(401).json({
      success: false,
      message: "Invalid token",
      isAuthentication: false,
    });
  }
};

