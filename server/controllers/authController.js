const crypto = require('crypto');
const User = require('../models/User');
const browserUtil = require('../utils/browserUtil');

exports.login = async (req, res) => {
  const uname = req.body.uname?.trim();
  const pass = crypto.createHash('sha256').update(req.body.pass).digest('hex');

  let login_error = 1;
  let id = null;

  // Fetch user by username
  const user = await User.findOne({ where: { uname } });

  if (user && user.pass === pass) {
    id = user.id;
    login_error = (user.status === 0) ? 2 : 0;
  }

  if (login_error === 0) {
    req.session.user = id;
    // Optionally log login event (IP, browser, etc.)
  }

  const error_msg = (login_error === 1)
    ? "Please Fill Up Correct User Name and Password"
    : "User Is Deactive.";

  res.json({ error: login_error, error_msg });
};