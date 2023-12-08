import { Dispatch, createContext, useReducer } from "react";
import { Node, Column } from "../interfaces";

type ViewState = {
	image: Node;
	columns: Column[];
};

type ColumnAction = { type: "SELECT_NODE"; rootNodeId: string; spearheadId: string };

type ViewContext = { state: ViewState; dispatch: Dispatch<ColumnAction> };

export const DEFAULT_IMAGE: Node = {
	id: "0",
	open: true,
	content: "Root",
	children: [
		{ id: "1", open: false, content: "Hello", children: [] },
		{
			id: "2",
			open: true,
			content: "World",
			children: [
				{ id: "3", open: false, content: "and everybody", children: [] },
				{ id: "4", open: false, content: "in it", children: [] },
			],
		},
	],
};

const DEFAULT_COLUMNS: Column[] = [
	{
		rootNodeId: "0",
		spearheadId: "0",
		selectedIds: ["0"],
		focused: false,
	},
	{
		rootNodeId: "2",
		spearheadId: "4",
		selectedIds: ["4"],
		focused: true,
	},
];

const DEFAULT_STATE: ViewState = {
	image: DEFAULT_IMAGE,
	columns: DEFAULT_COLUMNS,
};

export const ViewContext = createContext<ViewContext>({
	state: DEFAULT_STATE,
	dispatch: () => {},
});

function columnsReducer(state: ViewState, action: ColumnAction): ViewState {
	switch (action.type) {
		case "SELECT_NODE":
			return {
				...state,
				columns: state.columns.map((column) =>
					column.rootNodeId === action.rootNodeId
						? {
								...column,
								focused: true,
								spearheadId: action.spearheadId,
								focusedIds: [action.spearheadId],
						  }
						: {
								...column,
								focused: false,
								spearheadId: null,
								focusedIds: [],
						  }
				),
			};
		default:
			return state;
	}
}

export const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(columnsReducer, DEFAULT_STATE);

	// TODO: load saved data

	return (
		<ViewContext.Provider value={{ state, dispatch }}>
			{children}
		</ViewContext.Provider>
	);
};
