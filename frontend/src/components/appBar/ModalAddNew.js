import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormAddNew from './FormAddNew';

const ModalAddNew = ({ open, handleClose, setListNews }) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			<FormAddNew handleClose={handleClose} setListNews={setListNews} />
		</Dialog>
	);
};

export default ModalAddNew;
