const Cupon = require('../models/Cupon');

const addCupon = async (req, res) => {
	try {
		const { code, active } = req.body;
		const cupon = Cupon({
			code,
			active,
		});

		const cuponStored = await cupon.save();

		res.status(201).send({ cuponStored });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

const getCupons = async (req, res) => {
	const Cupons = await Cupon.find().lean().exec();
	res.status(200).send({ Cupons });
};

const updateCupon = async (req, res) => {
	const { id, ...updateData } = req.body;
	const query = await Cupon.findByIdAndUpdate(id, updateData);
	res.status(200).send({ query, updateData });
};

const deleteCupon = async (req, res) => {
	const { id } = req.body;
	let query;
	if (id === 'all') query = await Cupon.deleteMany();
	else query = await Cupon.findByIdAndRemove(id);

	res.status(200).send({ query });
};

module.exports = { addCupon, getCupons, updateCupon, deleteCupon };
