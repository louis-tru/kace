"use strict";

let $cancelT: number | false = false;

export let lineMode: string | false =  false;

export function setLineMode(text: string | false) {
	lineMode = text;
}

export function isPasteCancelled() {
	if ($cancelT && $cancelT > Date.now() - 50)
		return true;
	return $cancelT = false;
}

export function cancel() {
	$cancelT = Date.now();
}
