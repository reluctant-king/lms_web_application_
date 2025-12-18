const jwt = require("jsonwebtoken")


exports.getnstitutionToken = async (req, res) => {
    const institutionId = req.institute._id
    const options = {
        id: institutionId,
        time: Date.now()
    }
    const token = await jwt.sign(options, process.env.JWT_secret_key, { expiresIn: "50min" })

    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Faild to generate token",
            isAuthentication: false
        })
    }

    res.status(200).cookie("institutionToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }).json({
        success: true,
        message: "You have successfully signed in",
        isAuthentication: true,
        institute: req.institute,
        token
    });
}
