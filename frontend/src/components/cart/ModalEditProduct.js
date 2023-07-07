import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormEditProduct from './FormEditProduct';

const ModalEditProduct = ({ id, products, open, handleClose, setListProducts }) => {
	return (
		// props received from App.js
		<Dialog open={open} onClose={handleClose}>
			<FormEditProduct id={id} products={products} handleClose={handleClose} setListProducts={setListProducts} />
		</Dialog>
	);
};

export default ModalEditProduct;
