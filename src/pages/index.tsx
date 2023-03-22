import { Inter } from 'next/font/google';
import { Layout } from '@/Front/Layouts';
import { Typography } from '@mui/material';
import { FC } from 'react';

import { DeveloperResponse, Developer } from '../Front/Interfaces/Developer';
import { getDeveloper } from '../Front/Services/Developer/index';
import { Description } from '@/Front/Components';
import { Job } from '@/Front/Interfaces';
import { JobList } from '../Front/Components/JobList/index';

const inter = Inter({ subsets: ['latin'] });

interface Props {
	developer: Developer;
	jobs: Job[];
}

const HomePage: FC<Props> = ({ developer, jobs }) => {
	const { description } = developer;
	return (
		<Layout developer={developer}>
			<Description description={description} />
			<JobList jobs={jobs} />
		</Layout>
	);
};

export async function getStaticProps() {
	const { data }: { data: DeveloperResponse } = await getDeveloper();
	return {
		props: {
			developer: data.developer,
			jobs: data.developer?.jobs || []
		}
	};
}

export default HomePage;
