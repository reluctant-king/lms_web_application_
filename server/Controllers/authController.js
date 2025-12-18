const bcrypt = require("bcrypt");
const userModal = require("../modals/users")
const sendPasswordResetEmail = require("../Utils/sendPasswordResetEmail");
const crypto = require("crypto");
const { getToken } = require("../Utils/jwtToken");
const jwt = require("jsonwebtoken")


exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, role, expertise } = req.body;

        if (!firstname || !lastname || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModal.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            role,
            expertise

        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Failed to register"
            });
        }
        const message = role === 'instructor'
            ? "Registration successful! Your account is pending admin approval."
            : "Successfully registered! You can now login.";

        res.status(200).json({
            success: true,
            message,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                verificationStatus: user.verificationStatus
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    const { email, phone, password } = req.body

    try {
        const user = await userModal.findOne({
            $or: [{ email: email }]
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or phone"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }


        if (user.role === 'instructor' && !user.isApproved) {
            return res.status(403).json({
                success: false,
                message: user.verificationStatus === 'rejected'
                    ? `Your instructor application was rejected. Reason: ${user.rejectionReason || 'Not specified'}`
                    : "Your account is pending admin approval. Please wait for verification.",
                verificationStatus: user.verificationStatus
            });
        }

        await userModal.findByIdAndUpdate(user._id, { isLogin: true })
        const updatedUser = await userModal.findById(user._id);

        req.user = user
        getToken(req, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllUsers = async (req, res) => {
    // console.log(req.cookies)
    try {
        const { firstname } = req.query
        let query = {};
        if (firstname) {
            query.firstname = { $regex: firstname, $options: "i" };
        }

        const users = await userModal.find(query)
        if (!users) {
            return res.status(400).json({
                success: false,
                messsage: "Users noy found",

            });
        }

        res.status(200).json({
            success: true,
            users,

        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getUser = async (req, res) => {
    const { id } = req.params

    try {
        const item = await userModal.findById(id)

        if (!item) {
            return res.status(404).json({
                success: true,
                message: "user not found"
            })
        }

        res.status(200).json({
            successs: true,
            item,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userModal.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Users removed successfully!"
        });
    } catch (error) {

    }
}

exports.updateUsers = async (req, res) => {

    try {
        const { id } = req.params
        const user = await userModal.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user,
            message: "User updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModal.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const resetUrl = `http://localhost:5173/reset_password/${resetToken}`;
        console.log("Reset URL:", resetUrl);

        // Send password reset email
        await sendPasswordResetEmail(user.email, resetUrl, user.firstname);

        res.status(200).json({
            success: true,
            message: "Reset link sent to your email",
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.resetPAssword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;


        if (password.length < 8)
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        if (!/[A-Z]/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one uppercase letter." });
        if (!/[a-z]/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one lowercase letter." });
        if (!/\d/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one number." });
        if (!/[@$!%*?&]/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one special character (@$!%*?&)." });


        const user = await userModal.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });


        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful, please login again." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.getMe = async (req, res) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not logged in",
                user: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_secret_key);
        const user = await userModal.findById(decoded.id).select("-password");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                user: null
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            user: null
        });
    }
};

exports.logout = async (req, res) => {
    try {
        // Clear both cookies to be safe
        res.cookie("userToken", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        
        res.cookie("institutionToken", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}
exports.getPendingInstructors = async (req, res) => {
    try {
        const instructors = await userModal.find({
            role: 'instructor',
            verificationStatus: 'pending'
        }).select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: instructors.length,
            data: instructors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.approveInstructor = async (req, res) => {
    try {
        const { userId, adminId } = req.body;

        console.log('Approve request received:', { userId, adminId });

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }


        const instructor = await userModal.findByIdAndUpdate(
            userId,
            {
                isApproved: true,
                verificationStatus: 'approved',
                approvedAt: new Date(),
                ...(adminId && adminId !== 'ADMIN_ID_HERE' && { approvedBy: adminId })
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            });
        }

        console.log('Instructor approved:', instructor.email);

        res.status(200).json({
            success: true,
            message: "Instructor approved successfully",
            data: instructor
        });

    } catch (error) {
        console.error('Approve instructor error:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || "Failed to approve instructor"
        });
    }
};


exports.rejectInstructor = async (req, res) => {
    try {
        const { userId, reason } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        if (!reason) {
            return res.status(400).json({
                success: false,
                message: "Rejection reason is required"
            });
        }

        const instructor = await userModal.findByIdAndUpdate(
            userId,
            {
                isApproved: false,
                verificationStatus: 'rejected',
                rejectionReason: reason
            },
            { new: true }
        ).select('-password');

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            });
        }

        console.log('Instructor rejected:', instructor.email);

        res.status(200).json({
            success: true,
            message: "Instructor rejected",
            data: instructor
        });

    } catch (error) {
        console.error('Error rejecting instructor:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getInstructorsByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        let query = { role: 'instructor' };
        if (status) {
            query.verificationStatus = status;
        }

        const instructors = await userModal.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: instructors.length,
            data: instructors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getAllApprovedInstrecters = async (req, res) => {
    try {
        const instrecters = await userModal.find({
            role: "instructor",
            isApproved: true
        })
        res.status(200).json({
            success: true,
            message: "Successfullt fetch approved instrectors",
            length: instrecters.length,
            instrecters
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
