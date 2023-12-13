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

const Hotkeys = styled.div`
	height: 0.9em;

	font-size: 1.125em;
	color: #fe4118;
`;

const Hotkey = styled.kbd``;

export const CellComponent = ({
	action,
	hotkeys,
}: {
	action: string;
	hotkeys: string | string[];
}) => {
	return (
		<Cell>
			<Action>{action}</Action>
			<Hotkeys>
				{Array.isArray(hotkeys) ? (
					<>
						{hotkeys.map((hotkey, index, array) =>
							index === array.length - 1 ? (
								<Hotkey key={hotkey}>{hotkey}</Hotkey>
							) : (
								<Hotkey key={hotkey}>{`${hotkey} or `}</Hotkey>
							)
						)}
					</>
				) : (
					<Hotkey>{hotkeys}</Hotkey>
				)}
			</Hotkeys>
		</Cell>
	);
};
