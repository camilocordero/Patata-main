const New = require('../models/New');

const addNew = async (req, res) => {
	try {
		const { title, description, img, body, author } = req.body;
		const _new = New({
			title,
			description,
			img,
			body,
			author,
		});

		const newStored = await _new.save();

		res.status(201).send({ newStored });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

const getNews = async (req, res) => {
	const news = await New.find().lean().exec();
	res.status(200).send({ news });
};

const updateNew = async (req, res) => {
	const { id, ...updateData } = req.body;
	const query = await New.findByIdAndUpdate(id, updateData);
	res.status(200).send({ query, updateData });
};

const deleteNew = async (req, res) => {
	const { id } = req.body;
	let query;
	if (id === 'all') query = await New.deleteMany();
	else query = await New.findByIdAndRemove(id);
	res.status(200).send({ query });
};

module.exports = { addNew, getNews, updateNew, deleteNew };
