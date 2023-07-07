const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = Schema(
	{
		price: Number,
		productType: String,
		description: String,
		img: String,
		title: String,
	},
	{
		//for dates of create and upate
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', ProductSchema);
