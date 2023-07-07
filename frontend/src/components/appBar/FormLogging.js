import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ApiService from '../../services/api';
import bcrypt from 'bcryptjs';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,

		'& .MuiTextField-root': {
			margin: 10,
			width: '200px',
		},
		'& .MuiButtonBase-root': {
			margin: 10,
		},
		'& .MuiInputLabel-notchedOutfilled': {
			borderColor: 'red',
		},
	},
}));

const FormLogging = ({ setIsLogging, setIsManager, setIsEditing, isManager, handleClose, buttonText }) => {
	const classes = useStyles();
	// create state variables for each input
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (buttonText === 'Registrarse') {
			const type = isManager ? 'Manager' : 'Customer';
			var users = new ApiService('user');
			users
				.post({
					firstName: firstName,
					lastName: lastName,
					email: email,
					type: type,
					password: password,
				})
				.then((response) => {
					if (response.message?.includes('E11000')) alert('Este correo ya se encuentra registrado');
					else setIsLogging(true);
				});
		} else if (buttonText === 'Ingresar') {
			const logging = new ApiService('logging');
			logging
				.post({
					email,
					password,
				})
				.then((response) => {
					if (response?.token) {
						localStorage.setItem('Auth-Token', response.token);
						users = new ApiService('user');
						users.get().then((response) => {
							let userResponse = '';
							for (const user of response.users) {
								if (user.email === email) {
									userResponse = user;
									break;
								}
							}
							if (userResponse) {
								bcrypt.compare(password, userResponse.password, function (err, isMatch) {
									if (isMatch) {
										if (userResponse.type === 'Manager') {
											setIsManager(true);
											setIsEditing(true);
										}
										setIsLogging(true);
									} else {
										alert('Ingrese un usuario y contraseña validos');
									}
								});
							}
						});
					} else alert('Ingrese un usuario y contraseña validos');
				});
		}
		handleClose();
	};

	return (
		<form className={classes.root} onSubmit={handleSubmit}>
			{buttonText === 'Registrarse' && (
				<TextField
					label="Nombre"
					variant="filled"
					required
					value={firstName}
					onInvalid={(e) => e.target.setCustomValidity('El nombre es requerido')}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			)}
			{buttonText === 'Registrarse' && (
				<TextField label="Apellidos" variant="filled" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
			)}
			<TextField label="Correo" variant="filled" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
			<TextField
				label="Contraseña"
				variant="filled"
				type="password"
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div>
				{
					//style={{ background: '#1976d2', color: 'black', fontFamily: 'Arial', fontWeight: '1000' }}
				}
				<Button type="submit" variant="contained" style={{ background: '#333333', fontFamily: 'Arial', fontWeight: '700' }}>
					{buttonText}
				</Button>
			</div>
		</form>
	);
};

export default FormLogging;
