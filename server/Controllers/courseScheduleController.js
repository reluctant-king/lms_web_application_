const schedule = require("../modals/courseSchedule")

exports.addSchedule = async (req, res) => {

    const { batch, instructor, course, days, startTime, endTime, startDate, endDate, sessionType, location, status, description } = req.body

    try {
        if (!batch || !instructor || !course || !days || !startTime || !endTime || !startDate || !endDate || !sessionType || !location || !status || !description) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const data = await schedule.create(req.body);

        res.status(200).json({
            success: true,
            message: "Schedule created",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getAllSchedules = async (req, res) => {
    try {
        const { course } = req.query;
        let query = {};
        if (course) {
            query.course = { $regex: course, $options: "i" };
        }

        const schedules = await schedule.find(query);
        res.json({
            schedules,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
