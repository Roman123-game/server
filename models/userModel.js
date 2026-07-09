const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true
		},
		name: String,
		email: {
			type: String,
			required: true
		},
		picture: String,
		lastLogin: Date
	},
	{
		timestamps: true
	}
);

module.exports = usersDb.model('User', UserSchema);