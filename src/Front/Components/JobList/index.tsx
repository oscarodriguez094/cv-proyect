import { FC, useId } from 'react';

import { Paper, Grid, Typography } from '@mui/material';
import { Job } from '../../Interfaces/Job';
import { AccordionItem } from '../AccordionItem/index';
import moment from 'moment';
import 'moment/locale/es';

interface Props {
	jobs: Job[];
}

export const JobList: FC<Props> = ({ jobs = [] }) => {
	const renderJobs = () => {
		return jobs.map((job) => {
			let headerSecondary = '';
			if (job.endDate && job.endDate) {
				headerSecondary = `${moment(job.startDate).locale('es').format('L')}  - ${moment(job.endDate).locale('es').format('L')}`;
			}
			const item = {
				header: job.descriptionTitle,
				headerSecondary,
				description: job.description
			};
			return <AccordionItem key={job._id} item={item} />;
		});
	};

	return (
		<Paper elevation={3} sx={{ marginTop: 5, padding: 8 }}>
			<Typography sx={{ marginBottom: 3, fontWeight: 'bold' }}>Puestos Desarrollados:</Typography>
			<Grid container flexDirection="row" alignItems="flex-start" spacing={2} justifyContent="flex-start">
				{renderJobs()}
			</Grid>
		</Paper>
	);
};
