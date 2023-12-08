import Node from "@/app/components/Node";
import { type Node as NodeType } from "@/app/interfaces";
import { createContext, useContext } from "react";
import styled from "styled-components";
import { ViewContext } from "../contexts/ViewContext";
import { findInNestedArray } from "../utils/functions";

const Column = styled.div`
	/* * width prop fixes flex columns not sizing correctly on start */
	width: 100%;
	height: 100%;
	padding: 1rem;
`;

export const ColumnContext = createContext("0");

export function ColumnComponent({ id }: { id: string }) {
	const { state } = useContext(ViewContext);

	const root = findInNestedArray(state.image, (item: NodeType) => item.id === id);

	if (!root) throw `Column generation: no root node found with ID ${id}`;

	// * force root note to be open by default
	root.open = true;

	return (
		<ColumnContext.Provider value={id}>
			<Column>
				<Node root data={root} />
			</Column>
		</ColumnContext.Provider>
	);
}
