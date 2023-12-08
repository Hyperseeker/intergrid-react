import { UIStateContext } from "../contexts/UIStateContext";
import { useContext } from "react";
import styled, { css } from "styled-components";

const Backdrop = styled.div<{ $uiState?: string }>`
	display: none;

	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	background-color: hsl(0, 0%, 50%, 0.5);

	cursor: pointer;

	${({ $uiState }) =>
		$uiState === "edit" &&
		css`
			display: initial;
		`}
`;

export const BackdropComponent = () => {
	const { currentUIState, setUIState } = useContext(UIStateContext);

	return <Backdrop onClick={() => setUIState("view")} $uiState={currentUIState} />;
};
