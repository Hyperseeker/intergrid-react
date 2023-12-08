import styled from "styled-components";

const Cell = styled.div`
	display: flex;
	flex-direction: column;
	column-gap: -0.25ch;

	min-width: 7.5ch;

	padding: 0.5em;
	padding-block-end: 0.66em;

	color: white;

	& + & {
		border-inline-start: 1px solid #202020;
	}
`;

const Action = styled.span`
	height: 0.9em;
	
	font-size: 0.9em;
`;

const Hotkey = styled.kbd`
	height: 0.9em;

	font-size: 1.125em;
	color: #fe4118;
`;

export const CellComponent = ({
	action,
	hotkey,
}: {
	action: string;
	hotkey: string;
}) => {
	return (
		<Cell>
			<Action>{action}</Action>
			<Hotkey>{hotkey}</Hotkey>
		</Cell>
	);
};
