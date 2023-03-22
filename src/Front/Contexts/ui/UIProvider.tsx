import { FC, useState } from 'react';
import { UIContext } from '../ui/UiContext';

export interface Props {
	children: JSX.Element;
}

export const UIProvider: FC<Props> = ({ children }) => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const menuItems = ['Profile', 'Dashboard', 'Logout'];

	return (
		<UIContext.Provider
			value={{
				anchorElUser,
				setAnchorElUser,
				handleCloseUserMenu,
				handleOpenUserMenu,
				menuItems
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
