import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Send, Paperclip, MoreVertical, CheckCheck } from "lucide-react";

const API_BASE = "https://lms-web-application-backend-ymjf.onrender.com/api/v1";

const TicketChatPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/userticket/${ticketId}`, {
        withCredentials: true
      });
      setTicket(res.data.data);
      console.log("Ticket loaded:", res.data.data);
    } catch (err) {
      console.error("Error fetching ticket:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post(
          `${API_BASE}/userticket/${ticketId}/message`,
          { message: newMessage.trim() },
          { withCredentials: true }
        );
        setNewMessage('');
        fetchTicket();
      } catch (err) {
        console.error("Failed to send message:", err.response?.data || err.message);
      }
    }
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-700 font-medium">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ticket Not Found</h2>
          <p className="text-slate-600 mb-6">The ticket you're looking for doesn't exist</p>
          <Link
            to="/user/tickets" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition font-medium shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Top Navigation */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-emerald-200/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/user/tickets"
                className="p-2 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{ticket.subject || "Support Ticket"}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                      ticket.status === "open"
                        ? "bg-blue-100 text-blue-700"
                        : ticket.status === "in-progress"
                        ? "bg-amber-100 text-amber-700"
                        : ticket.status === "solved"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                      ticket.priority === "urgent"
                        ? "bg-rose-100 text-rose-700"
                        : ticket.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : ticket.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {ticket.priority || "Medium"}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {(!ticket.messages || ticket.messages.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4">
                <Send className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No messages yet</h3>
              <p className="text-slate-500 text-center max-w-sm">
                Start the conversation by sending your first message below or wait for admin response
              </p>
            </div>
          ) : (
            ticket.messages.map((msg, i) => {
              const senderRole = msg.sender_role || msg.sender?.role || "user";
              const isAdminMessage = ['admin', 'institution'].includes(senderRole);
              const showDateDivider = i === 0 || 
                new Date(ticket.messages[i - 1]?.createdAt).toDateString() !== 
                new Date(msg.createdAt).toDateString();
              
              return (
                <React.Fragment key={msg._id || i}>
                  {showDateDivider && (
                    <div className="flex justify-center my-8">
                      <span className="px-4 py-1.5 bg-white/60 backdrop-blur-sm text-xs font-medium text-slate-600 rounded-full border border-emerald-200/60 shadow-sm">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          weekday: "short", month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  <div className={`flex items-end gap-3 ${isAdminMessage ? "flex-row-reverse" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-lg flex-shrink-0 ${
                      isAdminMessage 
                        ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white" 
                        : senderRole === 'student' 
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" 
                        : senderRole === 'instructor' 
                        ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white"
                        : "bg-gradient-to-br from-slate-600 to-slate-700 text-white"
                    }`}>
                      {isAdminMessage 
                        ? "AD" 
                        : (msg.sender?.name?.[0]?.toUpperCase() || senderRole.charAt(0).toUpperCase() || "U")
                      }
                    </div>

                    <div className={`flex flex-col max-w-[65%] ${isAdminMessage ? "items-end" : "items-start"}`}>
                      <div className={`px-4 py-3 rounded-2xl shadow-sm max-w-full ${
                        isAdminMessage 
                          ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-br-md" 
                          : "bg-white text-slate-800 border border-slate-200/60 rounded-bl-md"
                      }`}>
                        <div className={`text-xs font-semibold mb-1 ${
                          isAdminMessage ? "text-emerald-100" : "text-slate-600"
                        }`}>
                          {isAdminMessage 
                            ? "Institution Support" 
                            : senderRole === 'student' 
                            ? `${msg.sender?.name || 'Student'} (Student)` 
                            : senderRole === 'instructor' 
                            ? `${msg.sender?.name || 'Instructor'} (Instructor)` 
                            : msg.sender?.name || "User"
                          }
                        </div>
                        <p className="text-[15px] leading-relaxed break-words">{msg.message}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 px-1 ${isAdminMessage ? "flex-row-reverse" : "flex-row"}`}>
                        <span className="text-xs text-slate-500">
                          {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                            hour: "numeric", minute: "2-digit", hour12: true,
                          })}
                        </span>
                        {isAdminMessage && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-emerald-200/60">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <button className="p-3 hover:bg-emerald-50 rounded-xl transition-colors text-slate-600" disabled>
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                rows={1}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 ml-14">Press Enter to send • Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

export default TicketChatPage;

