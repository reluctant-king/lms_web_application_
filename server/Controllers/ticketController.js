const Ticket = require("../modals/tickets");
const Message = require("../modals/message");
const User = require("../modals/users");


const generateTicketId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `TKT-${timestamp}-${random}`;
};


exports.createTicket = async (req, res) => {
  try {
    const { subject, category, message, attachment, priority } = req.body;
    if (!subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newTicket = new Ticket({
      ticketId: generateTicketId(),
      user: req.user._id,
      subject,
      category,
      message,
      attachment,
      priority: priority || "medium",
      status: "open",
    });

    await newTicket.save();
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAdminTickets = async (req, res) => {
  try {
    const pageNum = Number(req.query.page) || 1;
    const limitNum = Number(req.query.limit) || 100;
    const search = String(req.query.search || "").trim();
    const status = String(req.query.status || "all").toLowerCase();
    const priority = String(req.query.priority || "all").toLowerCase();

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    } else {
      query.status = { $ne: "closed" };
    }

    if (priority && priority !== "all") {
      query.priority = { $regex: `^${priority}$`, $options: "i" };
    }

    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const [tickets, total] = await Promise.all([
      Ticket.find(query)
        .populate("user", "name firstname lastname email")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Ticket.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: tickets,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
    });
  } catch (err) {
    console.error("getAdminTickets error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const msg = await Message.create({
      ticket: id,
      sender: req.user._id,
      sender_role: req.user.role, 
      message: message.trim(),
    });

    await Ticket.findByIdAndUpdate(id, { $push: { messages: msg._id } });

    const populatedMsg = await Message.findById(msg._id)
      .populate('sender', 'name firstname lastname email role')
      .lean();

    return res.status(201).json({
      success: true,
      data: populatedMsg,
    });
  } catch (err) {
    console.error("Add message error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTicketWithMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate("user", "name firstname lastname email");

    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    const messages = await Message.find({ ticket: id })
      .populate("sender", "name firstname lastname email role")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: { ...ticket.toObject(), messages },
    });
  } catch (err) {
    console.error("getTicketWithMessages error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAsSolved = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status: "solved", resolvedAt: new Date() },
      { new: true }
    );

    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getSolvedTickets = async (req, res) => {
  try {
    const pageNum = Number(req.query.page) || 1;
    const limitNum = Number(req.query.limit) || 10;
    const search = String(req.query.search || "").trim();

    const query = {
      status: { $in: ["solved", "closed"] },
    };

    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const [tickets, total] = await Promise.all([
      Ticket.find(query)
        .populate("user", "name email firstname lastname username")
        .sort({ resolvedAt: -1, updatedAt: -1, createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Ticket.countDocuments(query),
    ]);

    const withResolvedOn = tickets.map((t) => ({
      ...t,
      resolvedOn: t.resolvedAt || t.updatedAt || t.createdAt || null,
    }));

    res.json({
      success: true,
      data: withResolvedOn,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ ticket: req.params.id });
    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.status = status;

    if ((status === "solved" || status === "closed") && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
    }
   

    await ticket.save();
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
