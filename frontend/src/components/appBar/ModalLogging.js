import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FormLogging from './FormLogging';

const ModalLogging = ({ open, setIsLogging, setIsManager, setIsEditing, isManager, handleClose, buttonText }) => {
	return (
		// props received from App.js
		<Dialog open={open} onClose={handleClose}>
			<FormLogging
				setIsLogging={setIsLogging}
				setIsManager={setIsManager}
				setIsEditing={setIsEditing}
				isManager={isManager}
				handleClose={handleClose}
				buttonText={buttonText}
			/>
		</Dialog>
	);
};

export default ModalLogging;
