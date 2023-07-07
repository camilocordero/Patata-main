const Product = require('../models/Product');

const addProduct = async (req, res) => {
	try {
		const { price, productType, description, img, title } = req.body;
		const product = Product({
			price,
			productType,
			description,
			img,
			title,
		});

		const productStored = await product.save();

		res.status(201).send({ productStored });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

const getProducts = async (req, res) => {
	const products = await Product.find().lean().exec();
	res.status(200).send({ products });
};

const updateProduct = async (req, res) => {
	const { id, ...updateData } = req.body;
	const query = await Product.findByIdAndUpdate(id, updateData);
	res.status(200).send({ query, updateData });
};

const deleteProduct = async (req, res) => {
	const { id } = req.body;
	let query;
	if (id === 'all') await Product.deleteMany();
	else query = await Product.findByIdAndRemove(id);
	res.status(200).send({ query });
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
