"use strict";

import type { Editor } from "../editor";
import type { EditSession } from "../edit_session";
import type { Range } from "../range";
import type { SyntaxMode, SyntaxModeConstructor } from ".";

export type BehaviorAction = (state: string | string[], action: string, editor: Editor, session: EditSession, text: string | Range) => ({
	text: string,
	selection: number[]
} | Range) & { [key: string]: any } | undefined;
export type BehaviorMap = Record<string, Record<string, BehaviorAction>>;

export interface Behaviour {
	$behaviours: { [behaviour: string]: any }

	add(name: string, action: string, callback: BehaviorAction): void;

	addBehaviours(behaviours: BehaviorMap): void;

	remove(name: string): void;

	// inherit(mode: SyntaxMode | (new () => SyntaxMode), filter: string[]): void;
	inherit(mode: Behaviour | typeof Behaviour, filter: string[]): void;

	getBehaviours(filter?: string[]): BehaviorMap;
}

export class Behaviour {
	$behaviours: { [behaviour: string]: any } = {};

	/**
	 * @this {Behaviour & this}
	 */
	add(name: string, action: string, callback: BehaviorAction) {
		switch (undefined!) {
			case this.$behaviours:
				this.$behaviours = {};
			case this.$behaviours[name]:
				this.$behaviours[name] = {};
		}
		this.$behaviours[name][action] = callback;
	};

	/**
	 * @this {Behaviour & this}
	 */
	addBehaviours(behaviours: BehaviorMap) {
		for (var key in behaviours) {
			for (var action in behaviours[key]) {
				this.add(key, action, behaviours[key][action]);
			}
		}
	};

	/**
	 * @this {Behaviour & this}
	 */
	remove(name: string) {
		if (this.$behaviours && this.$behaviours[name]) {
			delete this.$behaviours[name];
		}
	};

	/**
	 * @this {Behaviour & this}
	 */
	inherit(mode: Behaviour | typeof Behaviour, filter: string[]) {
		if (typeof mode === "function") {
			var behaviours = new mode().getBehaviours(filter);
		} else {
			var behaviours = mode.getBehaviours(filter);
		}
		this.addBehaviours(behaviours);
	};

	/**
	 *
	 * @param [filter]
	 * @returns {{}|*}
	 * @this {Behaviour & this}
	 */
	getBehaviours(filter?: string[]): BehaviorMap {
		if (!filter) {
			return this.$behaviours;
		} else {
			var ret: BehaviorMap = {};
			for (var i = 0; i < filter.length; i++) {
				if (this.$behaviours[filter[i]]) {
					ret[filter[i]] = this.$behaviours[filter[i]];
				}
			}
			return ret;
		}
	};
}
