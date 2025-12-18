const institutionModal = require("../modals/Institution")
const institutionProfile = require("../modals/institutionProfile")
const bcrypt = require("bcrypt")
const { getnstitutionToken } = require("../Utils/jwtInstitutionToken")
const jwt = require("jsonwebtoken")




exports.addInstitution = async (req, res) => {
    const { institutionName, adminFullName, adminEmail, adminPassword, websiteUrl, image } = req.body

    try {
        if (!institutionName || !adminFullName || !adminEmail || !adminPassword || !image) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10)


        const institution = await institutionModal.create({
            institutionName,
            adminFullName,
            adminEmail,
            adminPassword: hashedPassword,
            websiteUrl,
            image


        })

        if (!institution) {
            return res.status(400).json({
                success: false,
                message: "Faild to register instituton"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully registerd your institution",
            institution
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllInstitute = async (req, res) => {
    try {
        let { institutionName } = req.query;
        let query = {};
        if (institutionName) {
            query.institutionName = { $regex: institutionName, $options: "i" };
        }
        const institutions = await institutionModal.find(query);

        if (!institutions) {
            return res.status(400).json({
                success: false,
                message: "Faild to fetch institutions"
            })
        }

        res.status(200).json({
            success: true,
            institutions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updateStatus = await institutionModal.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        if (!updateStatus) {
            return res.status(404).json({
                success: false,
                message: "Institution not found",
            });
        }
        res.status(200).json({
            success: true,
            messgae: "status updated successfuly",
            updateStatus
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginInstitute = async (req, res) => {
    const { email, adminPassword } = req.body;

    try {
        const institute = await institutionModal.findOne({ adminEmail: email });
        if (!institute) {
            return res.status(401).json({
                success: false,
                message: "Invalid email"
            });
        }

        const isPassword = await bcrypt.compare(adminPassword, institute.adminPassword);
        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            });
        }

        // res.status(200).json({
        //     success: true,
        //     message: "You have successfully signed in",
        //     isAuthentication: true,
        //     institute,
        // });

        req.institute = institute
        getnstitutionToken(req, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getInstitute = async (req, res) => {
    const { id } = req.params
    try {
        const institute = await institutionModal.findById(id)

        if (!institute) {
            return res.status(400).json({
                success: false,
                message: "Institution not found"
            })
        }

        if (institute) {
            res.status(200).json({
                success: true,
                institute
            })
        }
    } catch (error) {

    }
}


exports.updateInstitutionProfile = async (req, res) => {
    const { id } = req.params
    const { image,
        instituteName,
        address,
        email,
        phone,
        website,
        gstin,
        accreditation,
        founded,
        courses,
        students,
        placement,
        facilities } = req.body

    try {
        if ( !address ||  !phone || !founded || !courses || !placement) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const institutionProfile = await institutionModal.findByIdAndUpdate(
            id,
            {
                image,
                instituteName,
                address,
                email,
                phone,
                website,
                gstin,
                accreditation,
                founded,
                courses,
                students,
                placement,
                facilities
            })

        if (!institutionProfile) {
            return res.status(400).json({
                success: false,
                message: "Faild to create profile"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated your institution",
            institutionProfile
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllInstitutionProfile = async (req, res) => {
    console.log(req.cookies)
    try {
        const profile = await institutionProfile.find()

        res.status(200).json({
            success: true,
            profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// exports.getInstitute = async (req, res) => {
//     const { id } = req.params

//     try {
//         const institution = await institutionProfile.findById(id)

//         if (!institution) {
//             return res.status(404).json({
//                 success: true,
//                 message: "Institution not found"
//             })
//         }

//         res.status(200).json({
//             successs: true,
//             institution,

//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

exports.updataeInstitutionDetails = async (req, res) => {
    const { id } = req.params
    const {
        instituteName,
        address,
        email,
        phone,
        website,
        gstin,
        accreditation,
        founded,
        courses,
        students,
        placement,
        facilities } = req.body
    try {
        const institution = await institutionProfile.findById(id)

        if (!institution) {
            return res.status(404).json({
                success: false,
                message: "Institution not found"
            })
        }

        institution.instituteName = instituteName
        institution.address = address
        institution.email = email
        institution.phone = phone
        institution.website = website
        institution.gstin = gstin
        institution.accreditation = accreditation
        institution.founded = founded
        institution.courses = courses
        institution.students = students
        institution.placement = placement
        institution.facilities = facilities

        institution.save()

        res.status(201).json({
            success: true,
            institution,
            message: "Institution  updated succesfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.getInstituteAdmin = async (req, res) => {
    try {
        const token = req.cookies.institutionToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not logged in",
                instituteAdmin: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_secret_key);
        const instituteAdmin = await institutionModal.findById(decoded.id).select("-password");
        
        if (!instituteAdmin) {
            return res.status(404).json({
                success: false,
                message: "institution not found",
                instituteAdmin: null
            });
        }

        res.status(200).json({
            success: true,
            instituteAdmin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
