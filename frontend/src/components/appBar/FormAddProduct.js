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

const FormAddProduct = ({ handleClose, setListProducts }) => {
	const classes = useStyles();
	const [price, setPrice] = useState('');
	const [productType, setProductType] = useState('');
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');

	const products = new ApiService('product', localStorage.getItem('Auth-Token'));

	const inpostFileRef = useRef('');
	let addData = {};

	const handleSubmit = async (e) => {
		e.preventDefault();
		addData['price'] = price;
		addData['productType'] = productType;
		addData['description'] = description;
		addData['title'] = title;
		let imgToConvert = '';
		if (inpostFileRef.current.files.length === 1) {
			imgToConvert = inpostFileRef.current.files[0];
			await postProduct(imgToConvert);
		} else alert('La imagen es necesaria');
		handleClose();
	};

	function postProduct(file) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			addData['img'] = reader.result;
			products
				.post(addData)
				.then((response) => {
					products
						.get()
						.then((response) => {
							setListProducts(response.products);
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
			<TextField
				label="Tipo de producto"
				variant="filled"
				required
				value={productType}
				onChange={(e) => setProductType(e.target.value)}
			/>
			<TextField
				label="Descripción"
				variant="filled"
				multiline
				required
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<TextField label="Precio" variant="filled" required value={price} onChange={(e) => setPrice(e.target.value)} />
			<Button
				variant="contained"
				component="label"
				style={{ background: '#FAD63E', fontFamily: 'Arial', fontWeight: '700', color: 'black' }}>
				SUBIR IMAGEN
				<input type="file" hidden ref={inpostFileRef} />
			</Button>
			<div>
				{
					//style={{ background: '#1976d2', color: 'black', fontFamily: 'Arial', fontWeight: '1000' }}
				}
				<Button type="submit" variant="contained" style={{ background: '#333333', fontFamily: 'Arial', fontWeight: '700' }}>
					AÑADIR PRODUCTO
				</Button>
			</div>
		</form>
	);
};

export default FormAddProduct;
