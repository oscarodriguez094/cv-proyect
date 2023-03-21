import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '@/Front/Themes';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={lightTheme}>
			<SessionProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</SessionProvider>
		</ThemeProvider>
	);
}
