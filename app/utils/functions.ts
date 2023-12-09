import { MouseEvent } from "react";
import { type Node as IntergridNode } from "../interfaces";

type RectTestResult = {
	range: Range | null;
	distance: number;
};

function noop(...args: any[]) {
	return true;
}

// * calculate closest internal point contained by `rect`
function distanceToRect(rect: DOMRect, x: number, y: number) {
	const ix = Math.min(Math.max(x, rect.left), rect.right);
	const iy = Math.min(Math.max(x, rect.top), rect.bottom);

	// * calculate distance
	let dx = x - ix,
		dy = y - iy;

	return Math.sqrt(dx ** 2 + dy ** 2);
}

function testRects(
	node: Node,
	x: number,
	y: number,
	filter = noop,
	result: RectTestResult
) {
	if (!node.textContent) return;

	let length = node.textContent.length;

	while (length--) {
		let range = document.createRange();

		range.setStart(node, length);
		range.setEnd(node, length + 1);

		let rect = range.getBoundingClientRect();

		if (filter(range, rect)) {
			var distance = distanceToRect(rect, x, y);

			if (distance < result.distance) {
				result.distance = distance;
				result.range = range;
			}
		}
	}
}

function getRangeFromPoint(element: Node, x: number, y: number, fn = noop) {
	const result: RectTestResult = {
			range: null,
			distance: Infinity,
		},
		it = document.createNodeIterator(element, NodeFilter.SHOW_TEXT);

	let node;

	while ((node = it.nextNode())) testRects(node, x, y, fn, result);

	return result.range;
}

export function placeCaretToEnd(element: HTMLSpanElement) {
	const selection = window.getSelection();

	if (selection) {
		selection.selectAllChildren(element);
		selection.collapseToEnd();
	} else {
		console.warn("No selection found when trying to place caret at end");
	}
}

export function placeCaretToPoint(event: MouseEvent) {
	const selection = window.getSelection();

	if (!selection) return;

	// * text content of Node's content
	const anchor = selection.anchorNode;

	if (!anchor) return;

	const range = getRangeFromPoint(
		anchor,
		event.nativeEvent.clientX,
		event.nativeEvent.clientY
	);

	if (!range) return;

	// * point within text to which to collapse the caret to
	const offset = range.endOffset;

	// * "activates" the range by including it into the selection's "memory"
	selection.addRange(range);

	selection.collapse(anchor, offset);
}

export function findInNestedArray(node: IntergridNode, conditionFn = noop) {
	const stack = [node];

	if (stack.length === 0) return;

	while (stack.length) {
		const current = stack.pop();

		if (!current) return;

		if (conditionFn(current)) return current;

		if (current.children && Array.isArray(current.children)) {
			stack.push(...current.children);
		}
	}

	return null;
}
