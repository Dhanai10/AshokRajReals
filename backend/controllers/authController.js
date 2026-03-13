const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: 'admin-authenticated',
      message: 'Login successful'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
};

module.exports = { login };
