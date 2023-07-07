const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { auth, rootUser } = require('../config');
const User = require('../models/User');

const addUser = async (req, res) => {
	const token = req.header('Auth-Token');
	var type = 'Customer';
	if (token) {
		var decodedToken = jwt.decode(token, {
			complete: true,
		});
		const userCreator = await User.findOne({ _id: decodedToken.payload.id });
		if (userCreator && userCreator.type === 'Manager') {
			type = 'Manager';
		}
	}
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = User({
			firstName,
			lastName,
			email,
			type,
			password,
		});

		const userStored = await user.save();

		res.status(201).send({ userStored });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

const logginUser = async (req, res) => {
	User.countDocuments({}, function (err, count) {
		if (!count) {
			const user = User(rootUser);
			user.save();
		}
	});
	const user = await User.findOne({ email: req.body.email });

	if (user) {
		bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
			if (isMatch) {
				// create token
				const token = jwt.sign(
					{
						id: user._id,
					},
					auth.tokenSecret
				);
				res.status(200).send({ token });
			} else {
				res.status(401).json({ error: 'Unhautorizated' });
			}
		});
	} else res.status(401).json({ error: 'Unhautorizated' });
};

const getUsers = async (req, res) => {
	const users = await User.find().lean().exec();
	res.status(200).send({ users });
};

const updateUser = async (req, res) => {
	const { id, ...updateData } = req.body;
	const query = await User.findByIdAndUpdate(id, updateData);
	res.status(200).send({ query, updateData });
};

const deleteUser = async (req, res) => {
	const { id } = req.body;
	let query;
	if (id === 'all') query = await User.deleteMany();
	else query = await User.findByIdAndRemove(id);
	res.status(200).send({ query });
};

module.exports = { logginUser, addUser, getUsers, updateUser, deleteUser };
