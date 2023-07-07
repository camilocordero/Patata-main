import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React from 'react';

const Bought = () => {
	return (
		<Box mt={3}>
			<Typography variant="h2" align="center" style={{ color: '#FAD63E' }}>
				Compra realizada satisfactoriamente
			</Typography>
			<Typography variant="h2" align="center" style={{ color: '#FAD63E' }}>
				Gracias por contribuir a mantener patata :)
			</Typography>
		</Box>
	);
};

export default Bought;
