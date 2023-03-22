import { FC, useId } from 'react';

import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Item {
	header: string;
	headerSecondary: string;
	description: string;
}

interface Props {
	item: Item;
}

export const AccordionItem: FC<Props> = ({ item }) => {
	const { header, headerSecondary, description } = item;

	return (
		<Grid item xs={12} md={6}>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>{header}</Typography>
					<Typography sx={{ marginLeft: 10 }}>{headerSecondary}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>{description}</Typography>
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
};
