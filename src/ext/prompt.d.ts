
export interface PromptOptions {
	name: string; //!< Prompt name.
	$type?: string; //!< Use prompt of specific type (gotoLine|commands|modes or default if empty).
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

export function prompt(
	editor: import("../editor").Editor,
	message: string | Partial<PromptOptions>,
	options?: Partial<PromptOptions> | (() => void),
	callback?: () => void
): void;