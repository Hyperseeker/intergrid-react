import { Node } from "@/app/interfaces";
import {
	FormEvent,
	MouseEventHandler,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { UIStateContext } from "../contexts/UIStateContext";
import { useHotkeys } from "react-hotkeys-hook";
import styled, { css } from "styled-components";
import { placeCaretToEnd, placeCaretToPoint } from "../utils/functions";
import { ViewContext } from "../contexts/ViewContext";
import { ColumnContext } from "./Column";

const Container = styled.details`
	user-select: none;
`;

const Wrapper = styled.summary`
	position: relative;

	&::marker {
		content: "";
	}
`;

const Toggler = styled.span<{ $hidden?: boolean }>`
	position: absolute;
	left: -1.25ch;
	top: 0;

	margin-block: -0.5ch;
	margin-inline-end: 0.25ch;

	font-size: 1.75em;
	font-weight: 200;

	cursor: pointer;

	${({ $hidden }) =>
		$hidden &&
		css`
			visibility: hidden;
		`}
`;

const Content = styled.div<{
	$selected?: boolean;
	$open?: boolean;
	$edited?: boolean;
	$root?: boolean;
}>`
	display: table;

	/* minus 1px for the border width */
	padding: calc(0.25rem - 1px);

	border: 1px solid transparent;

	word-break: break-all;

	cursor: pointer;

	outline: none;

	${({ $root }) =>
		$root &&
		css`
			font-size: 2em;
		`};

	${({ $selected, $edited }) =>
		$selected &&
		css`
			background-color: ${$edited ? "white" : "var(--interface-accent)"};

			border: 1px solid ${$edited ? "black" : "var(--interface-accent)"};

			/* * uses EM (rather than REM) because size of shadow must correlate to overall size of box */
			/* * size of box is dictated by size of text */
			box-shadow: ${Array.from(
				{ length: 7 },
				(_, index) => 0.025 * (index + 1)
			).map((value, index, array) =>
				[
					`${value.toFixed(3)}em`,
					`${value.toFixed(3)}em`,
					$edited ? "black" : `var(--interface-accent-dark)`,
					`${index === array.length - 1 ? "" : ","}`,
				].join(" ")
			)};

			color: ${$edited ? "black" : "white"};
		`}

	${({ $selected, $open }) =>
		$open &&
		css`
			text-decoration: underline;
			text-decoration-thickness: 0.25ch;
			text-decoration-color: ${$selected ? "transparent" : "#dcdcdc"};
			text-underline-offset: 0.2ch;
		`}
`;

const Children = styled.div`
	&:not(:empty) {
		padding-inline-start: 1.75rem;
		padding-block-start: 0.1rem;
	}
`;

export default function Node({
	data: { id, open, children, content },
	root = false,
}: {
	data: Node;
	root?: boolean;
}) {
	const { state, dispatch } = useContext(ViewContext);
	const { currentUIState, setUIState } = useContext(UIStateContext);
	const columnNodeId = useContext(ColumnContext);

	const [isOpen, setIsOpen] = useState(open || false);
	const [isSelected, setIsSelected] = useState(false);

	const contentElement = useRef<HTMLDivElement>(null);
	const contentValue = useRef<string>(content || "");
	const contentValueInitial = useRef<string | null>(null);

	useEffect(() => {
		const column = state.columns.find(
			(column) => column.rootNodeId === columnNodeId
		);
		if (!column || !column.focused) return setIsSelected(false);
		setIsSelected(column.focused && column.spearheadId === id);
	}, [state]);

	useEffect(() => {
		switch (currentUIState) {
			case "edit":
				// * without `isSelected`, the first node of the column gets selected and edited
				if (isSelected && contentElement.current) {
					contentValueInitial.current = contentValue.current;
					placeCaretToEnd(contentElement.current);
				}
				break;
			default:
				break;
		}
	}, [currentUIState, isSelected]);

	useHotkeys(["F2", "Ctrl+Enter"], () => {
		setUIState("edit");
		console.log(currentUIState);
		if (contentElement.current) {
			placeCaretToEnd(contentElement.current);
		}
	});
	useHotkeys(
		"Esc",
		() => {
			if (contentElement.current && isSelected)
				contentElement.current.textContent = contentValueInitial.current;
			setUIState("view");
		},
		{ enableOnContentEditable: true }
	);

	const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

	const handleClick: MouseEventHandler<HTMLSpanElement> = useCallback(
		(event) => {
			if (isSelected) {
				setUIState("edit");

				if (contentElement.current) {
					// & force `contentEditable` without having to wait for the state
					// * makes sure `contentElement.current` has a reliable `anchorNode` to...
					// * ...use in `placeCaretToPoint`'s internal functions
					if (!contentElement.current.isContentEditable)
						contentElement.current.contentEditable = "true";
					contentElement.current.focus();
					placeCaretToPoint(event);
				}
			} else
				dispatch({
					type: "SELECT_NODE",
					rootNodeId: columnNodeId,
					spearheadId: id,
				});
		},
		[isSelected, currentUIState]
	);

	const handleBlur = useCallback(() => {
		setUIState("view");
		contentValueInitial.current = null;
	}, [contentValueInitial]);

	const handleChange = useCallback((event: FormEvent<HTMLSpanElement>) => {
		contentValue.current = event.currentTarget!.textContent || "";
	}, []);

	return (
		<Container open={isOpen}>
			<Wrapper
				onClick={(event) => {
					event.preventDefault();

					// * select the node even when the click is only on the same line as the node
					// * this emulates original behavior
					dispatch({
						type: "SELECT_NODE",
						rootNodeId: columnNodeId,
						spearheadId: id,
					});
				}}
			>
				{/* hide toggler if there are no children OR if it's the root node of the column */}
				<Toggler $hidden={!children.length || root} onClick={toggleOpen}>
					{isOpen ? "−" : "+"}
				</Toggler>
				<Content
					$selected={isSelected}
					$open={isOpen}
					$edited={currentUIState === "edit" && isSelected}
					$root={root}
					ref={contentElement}
					onClick={(event) => handleClick(event)}
					onBlur={handleBlur}
					onChange={handleChange}
					contentEditable={currentUIState === "edit"}
					suppressContentEditableWarning
				>
					{contentValue.current}
				</Content>
			</Wrapper>
			<Children>
				{children.map((childData) => (
					<Node key={childData.id} data={childData} />
				))}
			</Children>
		</Container>
	);
}
