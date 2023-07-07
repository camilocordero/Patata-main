import { API_LINK } from '../env';

export default class ApiService {
	constructor(model) {
		this.url = API_LINK + model;

		this.headers = new Headers();
		localStorage.getItem('Auth-Token') && this.headers.append('Auth-Token', localStorage.getItem('Auth-Token'));
	}

	async get() {
		return await fetch(this.url + 's', {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: this.headers,
		})
			.then((response) => response.json())
			.catch(function (error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
	}

	async getUsers() {
		return await fetch(API_LINK + 'users', {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: this.headers,
		})
			.then((response) => response.json())
			.catch(function (error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
	}

	async post(query) {
		let myHeaders = this.headers;
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Content-Type', 'application/json');
		return await fetch(this.url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: myHeaders,
			cache: 'default',
			body: JSON.stringify(query),
		})
			.then((response) => response.json())
			.catch(function (error) {
				alert('Hubo un problema con el registro: ' + error.message);
			});
	}

	async put(query) {
		let myHeaders = this.headers;
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Content-Type', 'application/json');
		return await fetch(this.url, {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: myHeaders,
			cache: 'default',
			body: JSON.stringify(query),
		})
			.then((response) => response.json())
			.catch(function (error) {
				alert('Hubo un problema con el registro: ' + error.message);
			});
	}

	async delete(query) {
		let myHeaders = this.headers;
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Content-Type', 'application/json');
		return await fetch(this.url, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors',
			headers: myHeaders,
			cache: 'default',
			body: JSON.stringify(query),
		})
			.then((response) => response.json())
			.catch(function (error) {
				alert('Hubo un problema la eliminacion: ' + error.message);
			});
	}
}
