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
			<Cell action="New line" hotkey="Enter" />
			<Cell action="Edit" hotkey="F2" />
			<Cell action="Delete" hotkey="Del" />
		</Footer>
	);
}
