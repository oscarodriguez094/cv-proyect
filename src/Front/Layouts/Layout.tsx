import { FC } from 'react';
import Head from 'next/head';

import { Container } from '@mui/material';
import { Developer } from '../Interfaces/Developer';
import { Header } from '../Components';
import AppBarComponent from '../Components/AppBar';

interface Props {
	title?: string;
	developer: Developer;
	children?: JSX.Element | JSX.Element[];
}

export const Layout: FC<Props> = ({ title = 'Oscar', developer, children }) => {
	const developerName = `${developer.name} ${developer.surname}`;
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<AppBarComponent developerName={developerName} />

			<header>
				<Header developer={developer} />
			</header>

			<Container>{children}</Container>

			<footer></footer>
		</>
	);
};
