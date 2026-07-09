const mongoose = require('mongoose');

const usersDb = mongoose.createConnection(
	process.env.USERS_MONGO_URI,
	{
		serverSelectionTimeoutMS: 5000
	}
);

usersDb.on('connected', () => {
	console.log('✅ Users MongoDB connected');
});

usersDb.on('error', (err) => {
	console.error('❌ Users MongoDB error:', err);
});

module.exports = usersDb;