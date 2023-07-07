import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

const FormEditNew = ({ id, news, getNews, handleClose, setListNews }) => {
	const classes = useStyles();
	const [description, setDescription] = useState('');
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');

	const inputFileRef = useRef('');
	let updateData = { id: id };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (description) updateData['description'] = description;
		if (body) updateData['body'] = body;
		if (title) updateData['title'] = title;
		let imgToConvert = '';
		if (inputFileRef.current.files.length === 1) imgToConvert = inputFileRef.current.files[0];
		await putNew(imgToConvert);
		handleClose();
	};

	function putNew(file) {
		let reader = new FileReader();
		if (file) reader.readAsDataURL(file);
		else {
			news.put(updateData)
				.then(() => {
					news.get()
						.then((response) => {
							setListNews(response.news);
						})
						.catch(function (error) {
							console.log('Hubo un problema con la petición Fetch:' + error.message);
						});
				})
				.catch((response) => alert(response));
		}
		reader.onload = function () {
			updateData['img'] = reader.result;
			news.put(updateData)
				.then(() => {
					news.get()
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
			<TextField label="Titulo" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
			<TextField label="Descripción" variant="filled" value={description} onChange={(e) => setDescription(e.target.value)} />
			<TextField label="Cuerpo de la noticia" variant="filled" multiline value={body} onChange={(e) => setBody(e.target.value)} />
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
					EDITAR NOTICIA
				</Button>
			</div>
		</form>
	);
};

export default FormEditNew;
