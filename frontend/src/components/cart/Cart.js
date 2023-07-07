import { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import accounting from 'accounting';
import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import ApiService from '../../services/api';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		padding: '16px',
	},
}));

export const Cart = ({ productsInCart, setProductsInCart, isEditing, listProducts, setListProducts }) => {
	const classes = useStyles();
	const products = new ApiService('product');

	const handleToAddShopping = (id, title, price) => {
		setProductsInCart([...productsInCart, { id: id, title: title, price: price }]);
	};

	useEffect(() => {
		products
			.get()
			.then((response) => {
				if (response.products !== listProducts) {
					setListProducts(response.products);
				}
			})
			.catch(function (error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getProducts = () => {
		products
			.get()
			.then((response) => {
				setListProducts(response.products);
			})
			.catch(function (error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
	};

	const generateRandomString = (num) => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let randomString = '';
		const counts = {};
		for (const product of productsInCart) {
			counts[product.title] = counts[product.title] ? counts[product.title] + 1 : 1;
		}
		Object.keys(counts).forEach(function (title) {
			randomString += `${title}*${counts[title]}_`;
		});
		const charactersLength = characters.length;
		const today = new Date();
		const now = today.toLocaleString();
		randomString += now;
		for (let i = 0; i < num; i++) {
			randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return randomString;
	};

	const handleRemoveProductInCart = (index) => {
		const newProductsInCart = productsInCart.filter((_, i) => i !== index);
		setProductsInCart(newProductsInCart);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{listProducts &&
					listProducts.map((product) => (
						<Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
							<Product
								key={product._id}
								product={product}
								products={products}
								getProducts={getProducts}
								handleToAddShopping={handleToAddShopping}
								isEditing={isEditing}
								setListProducts={setListProducts}
							/>
						</Grid>
					))}
				{productsInCart.length >= 1 && (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<form action="https://checkout.wompi.co/p/" method="GET" target="_blank">
							<input type="hidden" name="public-key" value="pub_prod_oe8OHpzzxLNmhVfpoEo7gQpIaaiDPcCt" />
							<input type="hidden" name="currency" value="COP" />
							<input
								type="hidden"
								name="amount-in-cents"
								value={
									productsInCart.reduce((accumulator, product) => {
										return accumulator + accounting.unformat(product.price);
									}, 0) * 100
								}
							/>
							<input type="hidden" name="reference" value={generateRandomString(3)} />
							<input type="hidden" name="collect-shipping" value="true" />
							<input type="hidden" name="collect-customer-legal-id" value="true" />
							<Box sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper' }}>
								<nav aria-label="main mailbox folders">
									<Typography variant="h5" color="textSecondary">
										Productos en el Carrito
									</Typography>
									<Divider />
									<List>
										{productsInCart.map((product, index) => (
											<>
												<ListItem onClick={() => handleRemoveProductInCart(index)} disablePadding>
													<ListItemButton>
														<ListItemText primary={product.title + ' - ' + product.price} />
														<ListItemIcon>
															<DeleteIcon />
														</ListItemIcon>
													</ListItemButton>
												</ListItem>
												<Divider />
											</>
										))}
									</List>
								</nav>
							</Box>
							<Button
								type="submit"
								variant="contained"
								style={{ background: '#333333', fontFamily: 'Arial', fontWeight: '700' }}>
								COMPRAR
							</Button>
						</form>
					</Grid>
				)}
			</Grid>
		</div>
	);
};
