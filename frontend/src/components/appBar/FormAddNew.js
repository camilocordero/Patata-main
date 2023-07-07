import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ApiService from '../../services/api';

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
		'& .MuiInpostLabel-notchedOutfilled': {
			borderColor: 'red',
		},
	},
}));

const FormAddNew = ({ handleClose, setListNews }) => {
	const classes = useStyles();
	const [description, setDescription] = useState('');
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');

	const new_ = new ApiService('new', localStorage.getItem('Auth-Token'));

	const inputFileRef = useRef('');
	let addData = {};

	const handleSubmit = async (e) => {
		e.preventDefault();
		addData['description'] = description;
		addData['body'] = body;
		addData['title'] = title;
		let imgToConvert = '';
		if (inputFileRef.current.files.length === 1) {
			imgToConvert = inputFileRef.current.files[0];
			await postNew(imgToConvert);
		} else alert('La imagen es necesaria');
		handleClose();
	};

	function postNew(file) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			addData['img'] = reader.result;
			new_.post(addData)
				.then((response) => {
					new_.get()
						.then((response) => {
							setListNews(response.news);
						})
						.catch(function (error) {
							console.log('Hubo un problema con la petición Fetch:' + error.message);
						});
				})
				.catch((response) => alert(response));
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}

	return (
		<form className={classes.root} onSubmit={handleSubmit}>
			<TextField label="Titulo" variant="filled" required value={title} onChange={(e) => setTitle(e.target.value)} />
			<TextField label="Descripción" variant="filled" required value={description} onChange={(e) => setDescription(e.target.value)} />
			<TextField
				label="Cuerpo de la noticia"
				variant="filled"
				required
				multiline
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<Button
				variant="contained"
				component="label"
				style={{ background: '#FAD63E', fontFamily: 'Arial', fontWeight: '700', color: 'black' }}>
				SUBIR IMAGEN
				<input type="file" hidden ref={inputFileRef} />
			</Button>
			<div>
				{
					//style={{ background: '#1976d2', color: 'black', fontFamily: 'Arial', fontWeight: '1000' }}
				}
				<Button type="submit" variant="contained" style={{ background: '#333333', fontFamily: 'Arial', fontWeight: '700' }}>
					AGREGAR NOTICIA
				</Button>
			</div>
		</form>
	);
};

export default FormAddNew;
