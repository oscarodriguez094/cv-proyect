import { Inter } from 'next/font/google';
import { Layout } from '@/Front/Layouts';
import { Typography } from '@mui/material';
import { FC } from 'react';

import { DeveloperResponse, Developer } from '../Front/Interfaces/Developer';
import { getDeveloper } from '../Front/Services/Developer/index';

const inter = Inter({ subsets: ['latin'] });

interface Props {
	developer: Developer;
}

const HomePage: FC<Props> = ({ developer }) => {
	return (
		<Layout developer={developer}>
			<Typography variant="h1" color="primary">
				Hola Mundo
			</Typography>
		</Layout>
	);
};

export async function getStaticProps() {
	const { data }: { data: DeveloperResponse } = await getDeveloper();
	console.log(data);
	return {
		props: {
			developer: data.developer
		}
	};
}

export default HomePage;
