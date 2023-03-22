import { FC, useId } from 'react';

import { Grid, Paper, Typography } from '@mui/material';
import { Developer } from '@/Front/Interfaces';
import { Container } from '@mui/system';

interface Props {
	developer: Developer;
}

export const Header: FC<Props> = ({ developer }) => {
	const displayHeader = [
		{ label: 'Nombre', text: developer.name, id: useId() },
		{ label: 'Apellidos', text: developer.surname, id: useId() },
		{ label: 'Email', text: developer.email, id: useId() },
		{ label: 'Direccion', text: developer.address, id: useId() },
		{ label: 'Teléfono', text: developer.phone, id: useId() }
	];

	return (
		<Container>
			<Paper elevation={3} sx={{ marginTop: 5, padding: 8 }}>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12} sm={12} md={6}>
						<Typography marginRight={2}>Nombre: {developer.name}</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={6} alignItems="center" justifyContent="center">
						{displayHeader.map((headerItem) => (
							<Grid item key={headerItem.id}>
								<Typography marginRight={2}>
									{headerItem.label}: {headerItem.text}
								</Typography>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};
