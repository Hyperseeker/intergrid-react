export type Node = {
	id: string;
	open: boolean;
	// TODO: revamp into `content_id`
	content: string;
	children: Node[];
};

export type Column = {
	rootNodeId: string;
	spearheadId: string | null;
	selectedIds: string[];
	focused?: boolean;
};
