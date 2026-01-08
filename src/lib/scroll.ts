import { MouseEvent } from "quark/event";

export function preventParentScroll(event: MouseEvent) {
	// event.stopPropagation();
	// TODO ... use quark event methods
	event.cancelBubble();
	// var target = event.currentTarget as HTMLElement;
	// var contentOverflows = target.scrollHeight > target.clientHeight;
	// if (!contentOverflows) {
	// 	// event.preventDefault();
	// 	event.cancelDefault();
	// }
};