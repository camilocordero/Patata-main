import React from 'react';
import AppBar from './components/appBar/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NewList } from './components/new/NewList';
import { Cart } from './components/cart/Cart';
import Bought from './components/satisfied_purchase/Bought';

import { createBrowserHistory } from 'history';

function App() {
	let history = createBrowserHistory();
	const [isEditing, setIsEditing] = React.useState(false);
	const [productsInCart, setProductsInCart] = React.useState([]);
	const [listProducts, setListProducts] = React.useState([]);
	const [listNews, setListNews] = React.useState([]);

	return (
		<>
			<Router>
				<AppBar
					history={history}
					productsInCart={productsInCart}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					setListProducts={setListProducts}
					setListNews={setListNews}
				/>
				<Switch>
					<Route exact path="/">
						<NewList isEditing={isEditing} listNews={listNews} setListNews={setListNews} />
					</Route>
					<Route exact path="/cart">
						<Cart
							productsInCart={productsInCart}
							setProductsInCart={setProductsInCart}
							isEditing={isEditing}
							listProducts={listProducts}
							setListProducts={setListProducts}
						/>
					</Route>
					<Route exact path="/bought">
						<Bought />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
