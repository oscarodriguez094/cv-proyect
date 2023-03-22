import { FC } from 'react';

import { Paper, Typography } from '@mui/material';

interface Props {
	description: string;
}

export const Description: FC<Props> = ({ description }) => {
	return (
		<Paper elevation={3} sx={{ marginTop: 5, padding: 8 }}>
			<Typography sx={{ marginBottom: 3, fontWeight: 'bold' }}>Descripcion General:</Typography>
			<Typography>{description}</Typography>
		</Paper>
	);
};
