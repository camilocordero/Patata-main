const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CuponSchema = Schema(
	{
		code: { type: String, unique: true },
		active: Boolean,
	},
	{
		//for dates of create and upate
		timestamps: true,
	}
);

module.exports = mongoose.model('Cupon', CuponSchema);
