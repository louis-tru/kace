"use strict";

let $cancelT: number | false = false;

	/** @type {string|false} */
export let lineMode: string | false =  false;

export function pasteCancelled() {
	if ($cancelT && $cancelT > Date.now() - 50)
		return true;
	return $cancelT = false;
}

export function cancel() {
	$cancelT = Date.now();
}
