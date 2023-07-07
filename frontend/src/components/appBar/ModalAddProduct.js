import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormAddProduct from './FormAddProduct';

const ModalAddProduct = ({ open, handleClose, setListProducts }) => {
	return (
		// props received from App.js
		<Dialog open={open} onClose={handleClose}>
			<FormAddProduct handleClose={handleClose} setListProducts={setListProducts} />
		</Dialog>
	);
};

export default ModalAddProduct;
