import { Dispatch, SetStateAction, createContext, useState } from "react";

type UIStateContextType = {
	currentUIState: string;
	setUIState: Dispatch<SetStateAction<string>>;
};

export const UIStateContext = createContext<UIStateContextType>({
	currentUIState: "",
	setUIState: () => {},
});

export const UIStateContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUIState, setUIState] = useState("view");

	return (
		<UIStateContext.Provider value={{ currentUIState, setUIState }}>
			{children}
		</UIStateContext.Provider>
	);
};
