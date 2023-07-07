import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormEditNew from './FormEditNew';

const ModalEditNew = ({ id, news, getNews, open, handleClose, setListNews }) => {
	return (
		// props received from App.js
		<Dialog open={open} onClose={handleClose}>
			<FormEditNew id={id} news={news} getNews={getNews} handleClose={handleClose} setListNews={setListNews} />
		</Dialog>
	);
};

export default ModalEditNew;
