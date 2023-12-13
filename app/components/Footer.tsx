import { useContext } from "react";
import { UIStateContext } from "../contexts/UIStateContext";
import { CellComponent as Cell } from "./Footer/Cell";
import styled from "styled-components";

const Footer = styled.footer<{ $uiState?: string }>`
	display: flex;

	width: 100%;

	background-color: #000;

	border-top: 1px solid #202020;

	color: white;
`;

export default function FooterComponent() {
	const { currentUIState } = useContext(UIStateContext);

	return (
		<Footer $uiState={currentUIState}>
			<Cell action="New line" hotkeys="Enter" />
			<Cell action="Edit" hotkeys={["F2", "Ctrl+Enter"]} />
			<Cell action="Delete" hotkeys="Del" />
			<Cell action="Indent" hotkeys="Tab" />
			<Cell action="Outdent" hotkeys="Shift+Tab" />
			<Cell action="Move up" hotkeys="Ctrl+Shift+Up" />
			<Cell action="Move down" hotkeys="Ctrl+Shift+Down" />
			<Cell action="Expand" hotkeys="Ctrl+Down" />
			<Cell action="Collapse" hotkeys="Ctrl+Up" />
			<Cell action="Open in column to left" hotkeys="Ctrl+L" />
			<Cell action="Open in column to right" hotkeys="Ctrl+R" />
			<Cell action="Filter" hotkeys="Ctrl+F" />
		</Footer>
	);
}
