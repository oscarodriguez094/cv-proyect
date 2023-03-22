import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import MenuComponent from '../Menu';
import { UIContext } from '../../Contexts/ui/UiContext';

interface Props {
	developerName: string;
}

const AppBarComponent: React.FC<Props> = ({ developerName }) => {
	const { handleOpenUserMenu, menuItems } = React.useContext(UIContext);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Currículum {developerName}
					</Typography>
					<Box display="flex" flexGrow={1} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<MenuComponent menuItems={menuItems} />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default AppBarComponent;
