/**
 * ## Interactive Linking Extension
 *
 * Enables clickable links and hover interactions in the editor when the Control key is pressed. Provides
 * keyboard-accelerated navigation by detecting tokens under the cursor and emitting custom events that can be handled
 * by external code to implement go-to-definition, symbol navigation, or other link-based functionality.
 *
 * **Enable:** `editor.setOption("enableLinking", true)`
 * @module
 */

import {Editor} from "../editor";
import config from "../config";
import type { MouseEvent } from "../mouse/mouse_event";
import type { Token } from "../background_tokenizer";
import type { Point } from "../range";

export interface LinkingOptions {
	enableLinking: boolean;
}

export interface LinkingEventsEditorExtension {
	"linkClick": (e: {position: Point, token: Token | null}, editor: Editor) => void;
	"linkHover": (e: {position: Point, token: Token | null}, editor: Editor) => void;
	"linkHoverOut": (e: void, editor: Editor) => void;
}

config.defineOptions(Editor.prototype, "editor", {
	enableLinking: {
		set: function(this: Editor, val: boolean) {
			if (val) {
				this.on("click", onClick);
				this.on("mousemove", onMouseMove);
			} else {
				this.off("click", onClick);
				this.off("mousemove", onMouseMove);
			}
		},
		value: false
	}
});

export let previousLinkingHover: boolean | Token | null  = false;

function onMouseMove(e: MouseEvent) {
	var editor = e.editor;
	var ctrl = e.getAccelKey();

	if (ctrl) {
		var editor = e.editor;
		var docPos = e.getDocumentPosition();
		var session = editor.session;
		var token = session.getTokenAt(docPos.row, docPos.column);

		if (previousLinkingHover && previousLinkingHover != token) {
			editor._emit("linkHoverOut", void 0, editor);
		}
		editor._emit("linkHover", {position: docPos, token: token}, editor);
		previousLinkingHover = token;
	} else if (previousLinkingHover) {
		editor._emit("linkHoverOut", void 0, editor);
		previousLinkingHover = false;
	}
}

function onClick(e: MouseEvent) {
	var ctrl = e.getAccelKey();
	var button = e.getButton();

	if (button == 0 && ctrl) {
		var editor = e.editor;
		var docPos = e.getDocumentPosition();
		var session = editor.session;
		var token = session.getTokenAt(docPos.row, docPos.column);

		editor._emit("linkClick", {position: docPos, token: token}, editor);
	}
}
