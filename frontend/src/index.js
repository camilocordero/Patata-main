import React from 'react';
import ReactDOM from 'react-dom';
import Patata from './Patata';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

const theme = createTheme(esES);

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Patata />
	</ThemeProvider>,
	document.getElementById('root')
);
