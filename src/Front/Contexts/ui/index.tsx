import { createContext } from 'react';

interface ContextProps {

	closeSideMenu: () => void;
	openSideMenu: () => void;

	setIsAddingEntry: (isAdding: boolean) => void;

	endDragging: () => void;
	startDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
