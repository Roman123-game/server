const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		picture: String,
		lastLogin: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', UserSchema);