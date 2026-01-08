"use strict";

export function last<T>(a: T[]) {
	return a[a.length - 1];
};


/** @param {string} string */
export function stringReverse(string: string) {
	return string.split("").reverse().join("");
};

export function stringRepeat(string: string, count: number) {
	var result = '';
	while (count > 0) {
		if (count & 1)
			result += string;

		if (count >>= 1)
			string += string;
	}
	return result;
};

var trimBeginRegexp = /^\s\s*/;
var trimEndRegexp = /\s\s*$/;

export function stringTrimLeft(string: string) {
	return string.replace(trimBeginRegexp, '');
};

export function stringTrimRight(string: string) {
	return string.replace(trimEndRegexp, '');
};
/**
 * @template T
 * @param {T} obj
 * @return {T}
 */
export function copyObject<T>(obj: T): T {
	/** @type Object*/
	var copy: any = {};
	for (var key in obj) {
		copy[key] = obj[key];
	}
	return copy;
};

export function copyArray<T>(array: T[]): T[] {
	var copy = [];
	for (var i=0, l=array.length; i<l; i++) {
		if (array[i] && typeof array[i] == "object")
			copy[i] = copyObject(array[i]);
		else
			copy[i] = array[i];
	}
	return copy;
};

export * from "./deep_copy";

export function arrayToMap(arr: any[]) {
	var map: Dict<number> = {};
	for (var i=0; i<arr.length; i++) {
		map[arr[i]] = 1;
	}
	return map;
};

export function createMap(props: Dict<any>) {
	var map = Object.create(null);
	for (var i in props) {
		map[i] = props[i];
	}
	return map;
};

/*
 * splice out of 'array' anything that === 'value'
 */
export function arrayRemove(array: any[], value: any) {
	for (var i = 0; i <= array.length; i++) {
		if (value === array[i]) {
			array.splice(i, 1);
		}
	}
};

export function escapeRegExp(str: string) {
	return str.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
};

export function escapeHTML(str: string) {
	return ("" + str).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
};

export function getMatchOffsets(string: string, regExp: RegExp) {
	var matches: {offset: number, length: number}[] = [];

	string.replace(regExp, function(str) {
		matches.push({
			offset: arguments[arguments.length-2],
			length: str.length
		});
		return str;
	});

	return matches;
};

/* deprecated */
export function deferredCall(fcn: () => void) {
	var timer: ReturnType<typeof setTimeout> | null = null;
	var callback = function() {
		timer = null;
		fcn();
	};

	function deferred(timeout?: number) {
		deferred.cancel();
		timer = setTimeout(callback, timeout || 0);
		return deferred;
	};

	deferred.schedule = deferred;

	deferred.call = function() {
		this.cancel();
		fcn();
		return deferred;
	};

	deferred.cancel = function() {
		clearTimeout(timer);
		timer = null;
		return deferred;
	};

	deferred.isPending = function() {
		return timer;
	};

	return deferred;
};

export type DelayedCall = ReturnType<typeof delayedCall>;

/**
 * @param {number} [defaultTimeout]
 */
export function delayedCall(fcn: () => void, defaultTimeout?: number) {
	var timer: TimeoutResult | null = null;
	var callback = function() {
		timer = null;
		fcn();
	};
	/**
	 * @param {number} [timeout]
	 */
	function _self(timeout?: number) {
		if (timer == null)
			timer = setTimeout(callback, timeout || defaultTimeout);
	};
	/**
	 * @param {number} [timeout]
	 */
	_self.delay = function(timeout?: number) {
		timer && clearTimeout(timer);
		timer = setTimeout(callback, timeout || defaultTimeout);
	};
	_self.schedule = _self;

	_self.call = function() {
		this.cancel();
		fcn();
	};

	_self.cancel = function() {
		timer && clearTimeout(timer);
		timer = null;
	};

	_self.isPending = function() {
		return timer;
	};

	return _self;
};

export function supportsLookbehind() {
	try {
		new RegExp('(?<=.)');
	} catch (e) {
		return false;
	}
	return true;
};

export function skipEmptyMatch(line: string, last: number, supportsUnicodeFlag: boolean) {
	return supportsUnicodeFlag && line.codePointAt(last)! > 0xffff ? 2 : 1;
};
