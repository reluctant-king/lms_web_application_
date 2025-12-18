const coursefeedbackModal = require("../modals/coursefeedback")


exports.sendCourseFeedback = async (req, res) => {
    const { courseId, userEmail, star, feedback, username, firstname, lastname } = req.body

    try {
        if (!feedback || !username || !userEmail) {
            return res.status(400).json({
                success: false,
                message: "Feedback and username is required"
            })
        }

        const feedbacks = await coursefeedbackModal.create({
            courseId, star, feedback, username, firstname, lastname, userEmail
        })

        if (!feedbacks) {
            return res.status(400).json({
                success: false,
                message: "faild to sent feedback !"
            })
        }

        if (feedbacks) {
            return res.status(200).json({
                success: true,
                message: "Successfully send feedback!",
                feedbacks
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message

        })
    }

}

exports.getAllCourseFeedBack = async (req, res) => {
    try {
        let feedbacks = await coursefeedbackModal.find()
        if (!feedbacks) {
            return res.status(400).json({
                success: false,
                message: "faild to fetch feedback !"
            })
        }

        if (feedbacks) {
            res.status(200).json({
                success: true,
                feedbacks
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message

        })
    }
}   