import { FC } from 'react';
import Head from 'next/head';

import { Grid, Typography } from '@mui/material';
import { Developer } from '../Interfaces/Developer';

interface Props {
	title?: string;
	developer: Developer;
	children: JSX.Element;
}

export const Layout: FC<Props> = ({ title = 'Oscar', developer }) => {
	return (
		<Grid container spacing={2}>
			<Head>
				<title>{title}</title>
			</Head>
			<Grid item xs={8}>
				<Typography>{developer.email}</Typography>
			</Grid>
		</Grid>
	);
};
