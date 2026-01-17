/**
 * ## Status bar extension for displaying editor state information
 *
 * Provides a lightweight status indicator that displays real-time information about the editor state including
 * cursor position, selection details, recording status, and keyboard binding information. The status bar
 * automatically updates on editor events and renders as an inline element that can be embedded in any parent container.
 *
 * **Usage:**
 * ```javascript
 * var StatusBar = require("ace/ext/statusbar").StatusBar;
 * var statusBar = new StatusBar(editor, parentElement);
 * ```
 *
 * @module
 */

"use strict";

import * as lang from "../lib/lang";
import type {Editor} from "../editor";
import {View,Text} from "quark";

/** simple statusbar **/
export class StatusBar{
	element: Text;
	/**
	 * @param {Editor} editor
	 * @param {View} parentNode
	 */
	constructor(editor: Editor, parentNode: View) {
		// this.element = dom.createElement("div");
		this.element = new Text(editor.window);
		this.element.class = ["ace_status-indicator"];
		// this.element.style.cssText = "display: inline-block;";
		parentNode.append(this.element);

		var statusUpdate = lang.delayedCall(() => {
			this.updateStatus(editor);
		}).schedule.bind(null, 100);

		editor.on("changeStatus", statusUpdate);
		editor.on("changeSelection", statusUpdate);
		editor.on("keyboardActivity", statusUpdate);
	}

	/**
	 * @param {Editor} editor
	 */
	updateStatus(editor: Editor) {
		var status: string[] = [];
		function add(str: string, separator?: string) {
			str && status.push(str, separator || "|");
		}
		// @ts-expect-error TODO: potential wrong argument
		add(editor.keyBinding.getStatusText(editor));
		if (editor.commands.recording)
			add("REC");
		
		var sel = editor.selection;
		var c = sel.lead;
		
		if (!sel.isEmpty()) {
			var r = editor.getSelectionRange();
			add("(" + (r.end.row - r.start.row) + ":"  +(r.end.column - r.start.column) + ")", " ");
		}
		add(c.row + ":" + c.column, " ");
		if (sel.rangeCount)
			add("[" + sel.rangeCount + "]", " ");
		status.pop();
		this.element.value = status.join("");
	}
}
