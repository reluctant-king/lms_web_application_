const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/jwtAuth");
const { instiAuthToken } = require("../middleware/jwtInstitutionAuth");
const ticketCtrl = require("../Controllers/ticketController");

// USER ROUTES
router.post("/createticket", authToken, ticketCtrl.createTicket);
router.get("/getusertickets", authToken, ticketCtrl.getUserTickets);
router.post("/userticket/:id/message", authToken, ticketCtrl.addMessage);
router.get("/userticket/:id", authToken, ticketCtrl.getTicketWithMessages);

// ADMIN/INSTITUTION ROUTES 
router.get("/admin", instiAuthToken, ticketCtrl.getAdminTickets);
router.get("/ticket/:id", instiAuthToken, ticketCtrl.getTicketWithMessages);
router.post("/ticket/:id/message", instiAuthToken, ticketCtrl.addMessage);     
router.patch("/ticket/:id/status", instiAuthToken, ticketCtrl.updateStatus);
router.delete("/ticket/:id", instiAuthToken, ticketCtrl.deleteTicket);
router.get("/solved", instiAuthToken, ticketCtrl.getSolvedTickets);
router.patch("/ticket/:id/solved", instiAuthToken, ticketCtrl.markAsSolved);

module.exports = router;
