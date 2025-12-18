const jwt = require("jsonwebtoken")


exports.getToken = async (req, res) => {
    const userId = req.user._id
    const options = {
        id: userId,
        time: Date.now()
    }
    const token = await jwt.sign(options, process.env.JWT_secret_key, { expiresIn: "100d" })

    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Faild to generate token",
            isAuthentication: false
        })
    }

    res.status(200).cookie("userToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }).json({
        success: true,
        message: "You are successfully sign in",
        isAuthentication: true,
        user: req.user,
        token
    })
}