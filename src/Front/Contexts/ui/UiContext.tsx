import { Dispatch, SetStateAction, createContext } from 'react';

interface ContextProps {
	anchorElUser: null | HTMLElement;
    menuItems: string[]

	// Methods
	setAnchorElUser: Dispatch<SetStateAction<HTMLElement | null>>;
	handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
	handleCloseUserMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
