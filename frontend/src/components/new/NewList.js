import { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import New from './New';
import React from 'react';

import ApiService from '../../services/api';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		padding: '16px',
	},
}));

export const NewList = ({ isEditing, listNews, setListNews }) => {
	const classes = useStyles();
	const news = new ApiService('new');

	useEffect(() => {
		news.get()
			.then((response) => {
				if (response.news !== listNews) {
					setListNews(response.news);
				}
			})
			.catch(function (error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getNews = () => {
		news.get()
			.then((response) => {
				setListNews(response.news);
			})
			.catch(function (error) {
				console.log('Hubo un problema con la petición Fetch:' + error.message);
			});
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{listNews &&
					listNews.map((new_) => (
						<Grid key={new_._id} item xs={12} sm={6} md={4} lg={3}>
							<New key={new_._id} new_={new_} news={news} getNews={getNews} isEditing={isEditing} setListNews={setListNews} />
						</Grid>
					))}
			</Grid>
		</div>
	);
};
