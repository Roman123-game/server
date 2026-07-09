const UserModel = require('../models/dataUser');

// POST /api/users/login
exports.saveGoogleUser = async (req, res) => {
	try {
		const {
			googleId,
			name,
			email,
			picture
		} = req.body;

		if (!googleId || !email) {
			return res.status(400).json({
				message: 'Missing user data'
			});
		}

		const user = await UserModel.findOneAndUpdate(
			{ googleId },
			{
				googleId,
				name,
				email,
				picture,
				lastLogin: new Date()
			},
			{
				new: true,
				upsert: true
			}
		);

		res.status(200).json({
			message: 'User saved successfully',
			user
		});

	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Internal Server Error',
			error
		});
	}
};


// GET /api/users
exports.getUsers = async (req, res) => {
	try {
		const users = await UserModel.find();

		if (!users.length) {
			return res.status(404).json({
				message: 'No users found'
			});
		}

		res.status(200).json(users);

	} catch (error) {
		res.status(500).json({
			message: 'Internal Server Error',
			error
		});
	}
};