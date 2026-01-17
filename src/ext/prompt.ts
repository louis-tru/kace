/**
 * ## User Input Prompt extension
 *
 * Provides customizable modal prompts for gathering user input with support for autocompletion, validation, and
 * specialized input types. Includes built-in prompt types for navigation (goto line), command palette, and mode
 * selection, with extensible architecture for custom prompt implementations.
 *
 * **Built-in Prompt Types:**
 * - `gotoLine`: Navigate to specific line numbers with selection support
 * - `commands`: Command palette with searchable editor commands and shortcuts
 * - `modes`: Language mode selector with filtering capabilities
 *
 * **Usage:**
 * ```javascript
 * // Basic prompt
 * prompt(editor, "Default value", {
 *   placeholder: "Enter text...",
 *   onAccept: (data) => console.log(data.value)
 * });
 *
 * // Built-in prompts
 * prompt.gotoLine(editor);
 * prompt.commands(editor);
 * prompt.modes(editor);
 * ```
 *
 * @module
 */

/**
 * @typedef {import("../editor").Editor} Editor
 */

"use strict";

import {nls} from "../config";
import {Point, Range} from "../range";
import * as dom from "../lib/dom";
import {FilteredList} from "../autocomplete";
import {AcePopup} from '../autocomplete/popup';
import {$singleLineEditor} from '../autocomplete/popup';
import {UndoManager} from "../undomanager";
import {Tokenizer} from "../tokenizer";
import {overlayPage} from "./menu_tools/overlay_page";
import * as modelist from "./modelist";
import type {Editor} from "../editor";
import type {Box} from "quark";
import type { CommandManager } from "../commands/command_manager";
import type { Command } from "../keyboard/hash_handler";

/**
 * @typedef PromptOptions
 * @property {String} name             Prompt name.
 * @property {String} $type            Use prompt of specific type (gotoLine|commands|modes or default if empty).
 * @property {[number, number]} selection  Defines which part of the predefined value should be highlighted.
 * @property {Boolean} hasDescription  Set to true if prompt has description below input box.
 * @property {String} prompt           Description below input box.
 * @property {String} placeholder      Placeholder for value.
 * @property {Object} $rules           Specific rules for input like password or regexp.
 * @property {Boolean} ignoreFocusOut  Set to true to keep the prompt open when focus moves to another part of the editor.
 * @property {Function} getCompletions Function for defining list of options for value.
 * @property {Function} getPrefix      Function for defining current value prefix.
 * @property {Function} onAccept       Function called when Enter is pressed.
 * @property {Function} onInput        Function called when input is added to prompt input box.
 * @property {Function} onCancel       Function called when Esc|Shift-Esc is pressed.
 * @property {Function} history        Function for defining history list.
 * @property {number} maxHistoryCount
 * @property {Function} addToHistory
 */

export interface PromptOptions {
	name: string; //!< Prompt name.
	$type?: 'gotoLine' | 'commands' | 'modes'; //!< Use prompt of specific type (gotoLine|commands|modes or default if empty).
	selection?: [number, number]; //!< Defines which part of the predefined value should be highlighted.
	hasDescription?: boolean; //!< Set to true if prompt has description below input box.
	prompt?: string; //!< Description below input box.
	placeholder?: string; //!< Placeholder for value.
	$rules?: object; //!< Specific rules for input like password or regexp.
	ignoreFocusOut?: boolean; //!< Set to true to keep the prompt open when focus moves to another part of the editor.
	getCompletions?: Function; //!< Function for defining list of options for value.
	getPrefix?: Function; //!< Function for defining current value prefix.
	onAccept?: Function; //!< Function called when Enter is pressed.
	onInput?: Function; //!< Function called when input is added to prompt input box.
	onCancel?: Function; //!< Function called when Esc|Shift-Esc is pressed.
	history?: Function; //!< Function for defining history list.
	maxHistoryCount?: number;
	addToHistory?: Function;
}

export interface PromptEditorExtension {
	cmdLine?: Editor; //!< Reference to command line editor.
}

var openPrompt: {
	close: () => void;
	name?: string;
	editor: Editor;
} | undefined;

/**
 * Prompt plugin is used for getting input from user.
 *
 * @param {Editor} editor                   Ouside editor related to this prompt. Will be blurred when prompt is open.
 * @param {String | Partial<PromptOptions>} message                  Predefined value of prompt input box.
 * @param {Partial<PromptOptions>} options                  Cusomizable options for this prompt.
 * @param {Function} [callback]               Function called after done.
 * */
// export function prompt(editor: Editor, message: string, options?: Partial<PromptOptions>, callback?: () => void): void;
// export function prompt(editor: Editor, options: Partial<PromptOptions>, callback?: () => void): void;
export function prompt(
		editor: Editor, message: string | Partial<PromptOptions>,
		opts?: Partial<PromptOptions> | (() => void), callback?: () => void): void
{
	if (typeof message == "object") {
		//// @ts-ignore
		return prompt(editor, "", message, opts as () => void);
	}
	const options = opts as Partial<PromptOptions> || {};
	if (typeof opts == "function") {
		callback = opts;
		opts = {};
	}

	if (openPrompt) {
		var lastPrompt = openPrompt;
		editor = lastPrompt.editor;
		lastPrompt.close();
		if (lastPrompt.name && lastPrompt.name == options.name)
			return;
	}
	if (options.$type)
		return prompt[options.$type!](editor, callback);

	var cmdLine = $singleLineEditor();
	cmdLine.session.setUndoManager(new UndoManager());

	var el: Box = dom.buildDom(["box", {class: "ace_prompt_container" + (options.hasDescription ? " input-box-with-description" : "")}]);
	var overlay = overlayPage(editor, el, done);
	el.append(cmdLine.container);

	if (editor) {
		editor.cmdLine = cmdLine;
		cmdLine.setOption("fontSize", editor.getOption("fontSize"));
	}
	if (message) {
		cmdLine.setValue(message, 1);
	}
	if (options.selection) {
		cmdLine.selection.setRange({
			start: cmdLine.session.doc.indexToPosition(options.selection[0]),
			end: cmdLine.session.doc.indexToPosition(options.selection[1])
		});
	}

	var popup: AcePopup | undefined;
	if (options.getCompletions) {
		popup = new AcePopup(editor.window);
		popup.renderer.setStyle("ace_autocomplete_inline");
		popup.container.style.visible = true;
		popup.container.style.maxWidth = 600;
		popup.container.style.width = "100%";
		popup.container.style.marginTop = 3;
		popup.renderer.setScrollMargin(2, 2, 0, 0);
		popup.autoSelect = false;
		popup.renderer.$maxLines = 15;
		popup.setRow(-1);
		popup.on("click", function(e) {
			var data = popup!.getData(popup!.getRow());
			if (!data["error"]) {
				cmdLine.setValue(data.value || data.name || String(data));
				accept();
				e.stop();
			}
		});
		el.append(popup.container);
		updateCompletions();
	}

	if (options.$rules) {
		var tokenizer = new Tokenizer(options.$rules);
		cmdLine.session.bgTokenizer.setTokenizer(tokenizer);
	}

	if (options.placeholder) {
		cmdLine.setOption("placeholder", options.placeholder);
	}

	if (options.hasDescription) {
		var promptTextContainer = dom.buildDom(["box", {class: "ace_prompt_text_container"}]);
		dom.buildDom(['label', {value: options.prompt || "Press 'Enter' to confirm or 'Escape' to cancel"}], promptTextContainer);
		el.append(promptTextContainer);
	}

	overlay.setIgnoreFocusOut(options.ignoreFocusOut);

	function accept() {
		var val;
		if (popup && popup.getCursorPosition().row > 0) {
			val = valueFromRecentList();
		} else {
			val = cmdLine.getValue();
		}
		var curData = popup ? popup.getData(popup.getRow()) : val;
		if (curData && /*!curData ["error"]*/ typeof curData == 'string') {
			done();
			options.onAccept && options.onAccept({
				value: val,
				item: curData
			}, cmdLine);
		}
	}

	var keys = {
		"Enter": accept,
		"Esc|Shift-Esc": function() {
			options.onCancel && options.onCancel(cmdLine.getValue(), cmdLine);
			done();
		}
	};

	if (popup) {
		Object.assign(keys, {
			"Up": function(editor: Editor) { popup!.goTo("up"); valueFromRecentList();},
			"Down": function(editor: Editor) { popup!.goTo("down"); valueFromRecentList();},
			"Ctrl-Up|Ctrl-Home": function(editor: Editor) { popup!.goTo("start"); valueFromRecentList();},
			"Ctrl-Down|Ctrl-End": function(editor: Editor) { popup!.goTo("end"); valueFromRecentList();},
			"Tab": function(editor: Editor) {
				popup!.goTo("down"); valueFromRecentList();
			},
			"PageUp": function(editor: Editor) { popup!.gotoPageUp(); valueFromRecentList();},
			"PageDown": function(editor: Editor) { popup!.gotoPageDown(); valueFromRecentList();}
		});
	}

	cmdLine.commands.bindKeys(keys);

	function done() {
		overlay.close();
		callback && callback();
		openPrompt = void 0;
	}

	cmdLine.on("input", function() {
		options.onInput && options.onInput();
		updateCompletions();
	});

	function updateCompletions() {
		if (options.getCompletions) {
			var prefix;
			if (options.getPrefix) {
				prefix = options.getPrefix(cmdLine);
			}

			var completions = options.getCompletions(cmdLine);
			popup!.setData(completions, prefix);
			popup!.resize(true);
		}
	}

	function valueFromRecentList() {
		var current = popup!.getData(popup!.getRow());
		if (current && !current["error"])
			return current.value || current.caption || current;
	}

	cmdLine.resize(true);
	if (popup) {
		popup!.resize(true);
	}
	cmdLine.focus();

	openPrompt = {
		close: done,
		name: options.name,
		editor: editor
	};
}

/**
 * Displays a "Go to Line" prompt for navigating to specific line and column positions with selection support.
 *
 * @param {Editor} editor - The editor instance to navigate within
 * @param {Function} [callback]
 */
prompt.gotoLine = function(editor: Editor, callback?: () => void) {
	function stringifySelection(selection: Range | Range[]): string {
		if (!Array.isArray(selection))
			selection = [selection];
		return selection.map(function(r) {
			var cursor = r.isBackwards ? r.start: r.end;
			var anchor = r.isBackwards ? r.end: r.start;
			var row = anchor.row;
			var s = (row + 1) + ":" + anchor.column;

			if (anchor.row == cursor.row) {
				if (anchor.column != cursor.column)
					s += ">" + ":" + cursor.column;
			} else {
				s += ">" + (cursor.row + 1) + ":" + cursor.column;
			}
			return s;
		}).reverse().join(", ");
	}

	prompt(editor, ":" + stringifySelection(editor.selection.toJSON()), {
		name: "gotoLine",
		selection: [1, Number.MAX_VALUE],
		onAccept: function(data: { value: string }) {
			var value = data.value;
			var _history = (prompt.gotoLine as any)["_history"];
			if (!_history)
				(prompt.gotoLine as any)["_history"] = _history = [];
			if (_history.indexOf(value) != -1)
				_history.splice(_history.indexOf(value), 1);
			_history.unshift(value);
			if (_history.length > 20) _history.length = 20;
			
			
			var pos = editor.getCursorPosition();
			var ranges: Range[] = [];
			value.replace(/^:/, "").split(/,/).map(function(str) {
				var parts = str.split(/([<>:+-]|c?\d+)|[^c\d<>:+-]+/).filter(Boolean);
				var i = 0;
				function readPosition() {
					var c = parts[i++];
					if (!c) return;
					if (c[0] == "c") {
						var index = parseInt(c.slice(1)) || 0;
						return editor.session.doc.indexToPosition(index);
					}
					var row = pos.row;
					var column = 0;
					if (/\d/.test(c)) {
						row = parseInt(c) - 1;
						c = parts[i++];
					}
					if (c == ":") {
						c = parts[i++];
						if (/\d/.test(c)) {
							column = parseInt(c) || 0;
						}
					}
					return {row: row, column: column};
				}
				pos = readPosition()!;
				var range = Range.fromPoints(pos, pos);
				if (parts[i] == ">") {
					i++;
					range.end = readPosition()!;
				}
				else if (parts[i] == "<") {
					i++;
					range.start = readPosition()!;
				}
				ranges.unshift(range);
			});
			editor.selection.fromJSON(ranges);
			var scrollTop = editor.renderer.scrollTop;
			editor.renderer.scrollSelectionIntoView(
				editor.selection.anchor, 
				editor.selection.cursor, 
				0.5
			);
			editor.renderer.animateScrolling(scrollTop);
		},
		history: function() {
			if (!(prompt.gotoLine as any)["_history"])
				return [];
			return (prompt.gotoLine as any)["_history"];
		},
		getCompletions: function(this: PromptOptions, cmdLine: Editor) {
			var value = cmdLine.getValue();
			var m = value.replace(/^:/, "").split(":");
			var row = Math.min(parseInt(m[0]) || 1, editor.session.getLength()) - 1;
			var line = editor.session.getLine(row);
			var current = value + "  " + line;
			return [current].concat(this.history!());
		},
		$rules: {
			start: [{
				regex: /\d+/,
				token: "string"
			}, {
				regex: /[:,><+\-c]/,
				token: "keyword"
			}]
		}
	});
};

/**
 * Displays a searchable command palette for executing editor commands with keyboard shortcuts and history.
 *
 * @param {Editor} editor - The editor instance to execute commands on
 * @param {Function} [callback]
 */
function commands(editor: Editor, callback?: () => void) {
	function normalizeName(name: string): string {
		return (name || "").replace(/^./, function(x) {
			return x.toUpperCase();
		}).replace(/[a-z][A-Z]/g, function(x) {
			return x[0] + " " + x[1].toLowerCase();
		});
	}
	function getEditorCommandsByName(excludeCommands: string[]) {
		var commandsByName: {key: string, command: string, description: string}[] = [];
		var commandMap: Dict<{key: string, command: string, description: string}> = {};
		editor.keyBinding.$handlers.forEach(function(handler) {
			var platform = handler["platform"]!;
			var cbn = handler["byName"];
			for (var i in cbn) {
				var key = cbn[i].bindKey as string;
				if (typeof key !== "string") {
					key = key && key[platform] || "";
				}
				var commands_ = cbn[i];
				var description = commands_.description || normalizeName(commands_.name!);
				var commands: Command[] = Array.isArray(commands_) ? commands_ : [commands_];
				commands.forEach(function(cmd) {
					const command = typeof cmd === "string" ? cmd : cmd.name!;
					const needle = excludeCommands.find(function(el) {
						return el === command;
					});
					if (!needle) {
						if (commandMap[command]) {
							commandMap[command].key += "|" + key;
						} else {
							commandMap[command] = {key: key, command: command, description: description};
							commandsByName.push(commandMap[command]);
						}
					}
				});
			}
		});
		return commandsByName;
	}
	// exclude commands that can not be executed without args
	var excludeCommandsList = ["insertstring", "inserttext", "setIndentation", "paste"];
	var shortcutsArrays = getEditorCommandsByName(excludeCommandsList);
	var shortcutsArray = shortcutsArrays.map(function(item) {
		return {value: item.description, meta: item.key, command: item.command};
	});
	prompt(editor, "",  {
		name: "commands",
		selection: [0, Number.MAX_VALUE],
		maxHistoryCount: 5,
		onAccept: function(this: PromptOptions, data: { item: { command: string } }) {
			if (data.item) {
				var commandName = data.item.command;
				this.addToHistory!(data.item);

				editor.execCommand(commandName);
			}
		},
		addToHistory: function(this: PromptOptions, item: { command: string, message?: string }) {
			var history = this.history!();
			history.unshift(item);
			delete item.message;
			for (var i = 1; i < history.length; i++) {
				if (history[i]["command"] == item.command ) {
					history.splice(i, 1);
					break;
				}
			}
			if (this.maxHistoryCount! > 0 && history.length > this.maxHistoryCount!) {
				history.splice(history.length - 1, 1);
			}
			commands["history"] = history;
		},
		history: function() {
			return commands["history"] || [];
		},
		getPrefix: function(cmdLine: Editor) {
			var currentPos = cmdLine.getCursorPosition();
			var filterValue = cmdLine.getValue();
			return filterValue.substring(0, currentPos.column);
		},
		getCompletions: function(this: PromptOptions, cmdLine: Editor) {

			type Cmd = {value?: string, meta?: string, command?: string, message?: string, error?: number};

			function getFilteredCompletions(commands: Cmd[], prefix: string) {
				var resultCommands = JSON.parse(JSON.stringify(commands));

				var filtered = new FilteredList(resultCommands);
				return filtered.filterCompletions(resultCommands, prefix);
			}

			function getUniqueCommandList(commands: Cmd[], usedCommands: Cmd[]) {
				if (!usedCommands || !usedCommands.length) {
					return commands;
				}
				var excludeCommands: string[] = [];
				usedCommands.forEach(function(item) {
					excludeCommands.push(item.command!);
				});

				var resultCommands: Cmd[] = [];

				commands.forEach(function(item) {
					if (excludeCommands.indexOf(item.command!) === -1) {
						resultCommands.push(item);
					}
				});

				return resultCommands;
			}

			var prefix = this.getPrefix!(cmdLine);
			var recentlyUsedCommands = getFilteredCompletions(this.history!(), prefix);
			var otherCommands_ = getUniqueCommandList(shortcutsArray, recentlyUsedCommands);
			var otherCommands = getFilteredCompletions(otherCommands_, prefix);

			if (recentlyUsedCommands.length && otherCommands.length) {
				recentlyUsedCommands[0].message = nls("prompt.recently-used", "Recently used");
				otherCommands[0].message = nls("prompt.other-commands", "Other commands");
			}

			var completions = recentlyUsedCommands.concat(otherCommands);
			return completions.length > 0 ? completions : [{
				value: nls("prompt.no-matching-commands", "No matching commands"),
				error: 1
			}];
		}
	});
};

commands.history = [] as { command: string, key?: string, description?: string }[];
prompt.commands = commands as (editor: Editor, callback?: () => void) => void;

/**
 * Shows an interactive prompt containing all available syntax highlighting modes
 * that can be applied to the editor session. Users can type to filter through the modes list
 * and select one to change the editor's syntax highlighting mode. The prompt includes real-time
 * filtering based on mode names and captions.
 *
 * @param {Editor} editor - The editor instance to change the language mode for
 * @param {Function} [callback]
 */

prompt.modes = function(editor: Editor, callback?: () => void) {
	/**@type {any[]}*/
	var modesArrays = modelist.modes;
	var modesArray = modesArrays.map(function(item) {
		return {value: item.caption, mode: item.name};
	});
	prompt(editor, "",  {
		name: "modes",
		selection: [0, Number.MAX_VALUE],
		onAccept: function(data: { item: { mode: string } }) {
			if (data.item) {
				var modeName = "ace/mode/" + data.item.mode;
				editor.session.setMode(modeName);
			}
		},
		getPrefix: function(cmdLine: Editor) {
			var currentPos = cmdLine.getCursorPosition();
			var filterValue = cmdLine.getValue();
			return filterValue.substring(0, currentPos.column);
		},
		getCompletions: function(this: PromptOptions, cmdLine: Editor) {
			function getFilteredCompletions(modes: {value: string, mode: string}[], prefix: string) {
				var resultCommands = JSON.parse(JSON.stringify(modes));

				var filtered = new FilteredList(resultCommands);
				return filtered.filterCompletions(resultCommands, prefix);
			}

			var prefix = this.getPrefix!(cmdLine);
			var completions = getFilteredCompletions(modesArray, prefix);
			return completions.length > 0 ? completions : [{
				"caption": "No mode matching",
				"value": "No mode matching",
				"error": 1
			}];
		}
	});
};

dom.importCss({
'.ace_prompt_container': {
	maxWidth: 603,
	width: '100%',
	margin: [20, 0],
	padding: 3,
	backgroundColor: '#fff',
	borderRadius: 2,
	boxShadow: '0 2 3 #555',
}}, "promtp.css", false);
