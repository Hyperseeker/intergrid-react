"use client";
import ControllerComponent from "./Controller";
import { UIStateContextProvider } from "./contexts/UIStateContext";
import { ViewContextProvider } from "./contexts/ViewContext";

export default function Home() {
	return (
		<UIStateContextProvider>
			<ViewContextProvider>
				<ControllerComponent />
			</ViewContextProvider>
		</UIStateContextProvider>
	);
}
