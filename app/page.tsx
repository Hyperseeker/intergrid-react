"use client";
import { ControllerComponent as Controller } from "./Controller";
import { UIStateContextProvider } from "./contexts/UIStateContext";
import { ViewContextProvider } from "./contexts/ViewContext";

export default function Home() {
	return (
		<UIStateContextProvider>
			<ViewContextProvider>
				<Controller />
			</ViewContextProvider>
		</UIStateContextProvider>
	);
}
