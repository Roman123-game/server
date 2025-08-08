exports.getStatus = (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running smoothly 🚀',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};