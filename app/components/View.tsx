"use client";
import { type Column as ColumnType } from "@/app/interfaces";
import Split from "@uiw/react-split";
import { ColumnComponent as Column } from "./Column";
import styled from "styled-components";

const Columns = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 0 100%;
`;

export default function View({ columns }: { columns: ColumnType[] }) {
	return (
		<Columns>
			<Split lineBar style={{ flex: 1 }}>
				{columns.map((column, index) => (
					<Column
						key={`${column.rootNodeId}${index}`}
						id={column.rootNodeId}
					/>
				))}
			</Split>
		</Columns>
	);
}
