const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RazireKeyId,
  key_secret: process.env.RazoreKeySecret,
});

module.exports = instance;

