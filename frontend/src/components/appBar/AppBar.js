import * as React from 'react';
import { AppBar as NavBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import Logo from '../../imgs/logoEslogan2.png';

import { withRouter } from 'react-router-dom';

import ModalLogging from './ModalLogging';
import ModalAddProduct from './ModalAddProduct';
import ModalAddNew from './ModalAddNew';

function AppBar({ history, productsInCart, isEditing, setIsEditing, setListProducts, setListNews }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [isLogging, setIsLogging] = React.useState(false);
	const [isManager, setIsManager] = React.useState(false);
	// declare a new state variable for modal open
	const [modalOpen, setModalOpen] = React.useState(false);
	const [modalAddOpen, setModalAddOpen] = React.useState(false);
	const [modalAddNewOpen, setModalAddNewOpen] = React.useState(false);

	// button text modal
	const [buttonText, setButtonText] = React.useState('');

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const label = { inputProps: { 'aria-label': 'Switch demo' } };

	const handleModalAddOpen = () => {
		setModalAddOpen(true);
	};

	const handleModalAddNewOpen = () => {
		setModalAddNewOpen(true);
	};

	const handleModalAddClose = () => {
		setModalAddOpen(false);
	};

	const handleModalAddNewClose = () => {
		setModalAddNewOpen(false);
	};

	const handleSwitch = () => {
		setIsEditing(!isEditing);
	};

	const handleProfileMenuOpen = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (e) => {
		setMobileMoreAnchorEl(e.currentTarget);
	};

	const handleModalOpenLogging = () => {
		handleMenuClose();
		setButtonText('Ingresar');
		setModalOpen(true);
	};

	const handleModalOpenSignUp = () => {
		handleMenuClose();
		setButtonText('Registrarse');
		setModalOpen(true);
	};

	const handleLoggout = (e) => {
		handleMenuClose();
		handleMobileMenuClose();
		history.push('/');
		setIsLogging(false);
		setIsManager(false);
		setIsEditing(false);
		localStorage.setItem('Auth-Token', false);
	};

	const handleToHome = () => {
		handleMobileMenuClose();
		history.push('/');
	};
	const handleToCart = () => {
		handleMobileMenuClose();
		history.push('/cart');
	};

	const handleWhatsapp = () => {
		window.open('https://wa.link/r2s6ow', '_blank').focus();
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			{!isLogging && <MenuItem onClick={handleModalOpenLogging}>Ingresar</MenuItem>}
			{!isLogging && <MenuItem onClick={handleModalOpenSignUp}>Registrarse</MenuItem>}
			{isLogging && isManager && <MenuItem onClick={handleModalOpenSignUp}>Registrarse</MenuItem>}
			{isLogging && <MenuItem onClick={handleLoggout}>Salir</MenuItem>}
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem onClick={handleToHome}>
				<IconButton size="large" color="inherit">
					<FiberNewIcon />
				</IconButton>
				<p>Noticias</p>
			</MenuItem>
			<MenuItem onClick={handleToCart}>
				{productsInCart && (
					<IconButton size="large" color="inherit">
						<Badge badgeContent={productsInCart.length} color="error">
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
				)}
				{!productsInCart && (
					<IconButton size="large" color="inherit">
						<ShoppingCartIcon />
					</IconButton>
				)}
				<p>Tienda</p>
			</MenuItem>
			<MenuItem onClick={handleWhatsapp}>
				<IconButton size="large" color="inherit">
					<WhatsAppIcon />
				</IconButton>
				<p>Noticias</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit">
					<AccountCircle />
				</IconButton>
				<p>Cuenta</p>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				{
					//style={{ background: '#e2e0ee' }}
				}
				{
					//color="black"
				}
				{
					//style={{ fill: '#333333' }}
				}
				<NavBar position="static" style={{ background: '#FAD63E', pointerEvents: 'all' }}>
					<Toolbar>
						<img style={{ height: '1.9rem', width: '11.8rem', cursor: 'pointer' }} src={Logo} alt="" onClick={handleToHome} />
						{isLogging && isManager && <Switch {...label} defaultChecked onChange={handleSwitch} />}
						{history.location.pathname === '/cart' && isLogging && isManager && isEditing && (
							<IconButton size="large" onClick={handleModalAddOpen} color="inherit">
								<AddCircleIcon style={{ fill: '#333333' }} />
							</IconButton>
						)}
						{history.location.pathname === '/' && isLogging && isManager && isEditing && (
							<IconButton size="large" onClick={handleModalAddNewOpen} color="inherit">
								<AddCircleIcon style={{ fill: '#333333' }} />
							</IconButton>
						)}
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<IconButton size="large" onClick={handleToHome} color="inherit">
								<FiberNewIcon style={{ fill: '#333333' }} />
							</IconButton>
							<IconButton size="large" onClick={handleToCart} color="inherit">
								{productsInCart && (
									<Badge badgeContent={productsInCart.length} color="error">
										<ShoppingCartIcon style={{ fill: '#333333' }} />
									</Badge>
								)}
								{!productsInCart && <ShoppingCartIcon style={{ fill: '#333333' }} />}
							</IconButton>
							<IconButton size="large" onClick={handleWhatsapp} color="inherit">
								<WhatsAppIcon style={{ fill: '#333333' }} />
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit">
								<AccountCircle style={{ fill: '#333333' }} />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit">
								<MoreIcon style={{ fill: '#333333' }} />
							</IconButton>
						</Box>
					</Toolbar>
				</NavBar>
				{renderMobileMenu}
				{renderMenu}
			</Box>
			<div>
				<ModalLogging
					setIsLogging={setIsLogging}
					setIsManager={setIsManager}
					setIsEditing={setIsEditing}
					isManager={isManager}
					open={modalOpen}
					handleClose={handleModalClose}
					buttonText={buttonText}
				/>
			</div>
			<div>
				<ModalAddProduct open={modalAddOpen} handleClose={handleModalAddClose} setListProducts={setListProducts} />
			</div>
			<div>
				<ModalAddNew open={modalAddNewOpen} handleClose={handleModalAddNewClose} setListNews={setListNews} />
			</div>
		</>
	);
}

export default withRouter(AppBar);
