import { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

import ModalEditNew from './ModalEditNew';

const useStyles = makeStyles(() => ({
	root: {
		maxWidth: 500,
	},
	action: {
		marginTop: '1rem',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
}));

export default function New({ new_: { _id, title, description, img, body }, news, getNews, isEditing, setListNews }) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleDelete = () => {
		news.delete({
			id: _id,
		}).catch((response) => alert(response));
		getNews();
	};

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};
	return (
		<Card className={classes.root}>
			<CardHeader title={title} />
			<CardMedia className={classes.media} image={img} title={title} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{isEditing && (
					<IconButton aria-label="Editar el carro" onClick={handleModalOpen}>
						<EditIcon fontSize="large" />
					</IconButton>
				)}
				{isEditing && (
					<IconButton aria-label="Add to Cart" onClick={handleDelete}>
						<DeleteIcon fontSize="large" />
					</IconButton>
				)}

				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more">
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>{body}</Typography>
				</CardContent>
			</Collapse>
			<div>
				<ModalEditNew
					id={_id}
					news={news}
					getNews={getNews}
					open={modalOpen}
					handleClose={handleModalClose}
					setListNews={setListNews}
				/>
			</div>
		</Card>
	);
}
