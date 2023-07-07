const express = require('express');
const productRoutes = require('./routes/product');
const cuponRoutes = require('./routes/cupon');
const newRoutes = require('./routes/new');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(function (request, response, next) {
	if (process.env.NODE_ENV == 'prod' && !request.secure) {
		return response.redirect('https://' + request.headers.host + request.url);
	}

	next();
});

// set limit for permit a long image encoded
app.use(
	bodyParser.json({
		limit: '50mb',
	})
);

app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		parameterLimit: 100000,
		extended: true,
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	// allow cors
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Auth-Token'
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

apiRouteVersion = '/api/v1/';
app.use(apiRouteVersion, userRoutes);
app.use(apiRouteVersion, productRoutes);
app.use(apiRouteVersion, cuponRoutes);
app.use(apiRouteVersion, newRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, './front_build')));
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './', 'front_build', 'index.html')));
} else {
	app.get('/', (req, res) => res.send('Please set to production'));
}

module.exports = app;
