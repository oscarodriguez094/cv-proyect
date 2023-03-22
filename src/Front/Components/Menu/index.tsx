import * as React from 'react';
import { Typography, Menu, MenuItem } from '@mui/material';

import { UIContext } from '@/Front/Contexts';

interface Props {
	menuItems: string[];
}

const MenuComponent: React.FC<Props> = ({ menuItems }) => {
	const { handleCloseUserMenu, anchorElUser } = React.useContext(UIContext);
	return (
		<Menu
			sx={{ mt: '45px' }}
			id="menu-appbar"
			anchorEl={anchorElUser}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			open={Boolean(anchorElUser)}
			onClose={handleCloseUserMenu}
		>
			{menuItems.map((setting) => (
				<MenuItem key={setting} onClick={handleCloseUserMenu}>
					<Typography textAlign="center">{setting}</Typography>
				</MenuItem>
			))}
		</Menu>
	);
};
export default MenuComponent;
