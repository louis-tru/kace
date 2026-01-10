
export declare namespace Ace {
	type BracketMatch = import("./src/edit_session/bracket_match").BracketMatch;
	type Folding = import("./src/edit_session/folding").Folding;
	type Anchor = import("./src/anchor").Anchor;
	type Editor = import("./src/editor").Editor;
	type EditSession = import("./src/edit_session").EditSession;
	type Document = import("./src/document").Document;
	type Fold = import("./src/edit_session/fold").Fold;
	type FoldLine = import("./src/edit_session/fold_line").FoldLine;
	type Range = import("./src/range").Range;
	type VirtualRenderer = import("./src/virtual_renderer").VirtualRenderer;
	type UndoManager = import("./src/undomanager").UndoManager;
	type Tokenizer = import("./src/tokenizer").Tokenizer;
	type TokenIterator = import("./src/token_iterator").TokenIterator;
	type Selection = import("./src/selection").Selection;
	type Autocomplete = import("./src/autocomplete").Autocomplete;
	type InlineAutocomplete = import("./src/ext/inline_autocomplete").InlineAutocomplete;
	type CompletionProvider = import("./src/autocomplete").CompletionProvider;
	type AcePopup = import("./src/autocomplete/popup").AcePopup;
	type AceInline = import("./src/autocomplete/inline").AceInline;
	type MouseEvent = import("./src/mouse/mouse_event").MouseEvent;
	type RangeList = import("./src/range_list").RangeList;
	type FilteredList = import("./src/autocomplete").FilteredList;
	type LineWidgets = import("./src/line_widgets").LineWidgets;
	type SearchBox = import("./src/ext/searchbox").SearchBox;
	type Occur = import("./src/occur").Occur;
	type DefaultHandlers = import("./src/mouse/default_handlers").DefaultHandlers;
	type GutterHandler = import("./src/mouse/default_gutter_handler").GutterHandler;
	type DragdropHandler = import("./src/mouse/dragdrop_handler").DragdropHandler;
	type AppConfig = import("./src/lib/app_config").AppConfig;
	type Config = typeof import("./src/config");
	type GutterTooltip = import( "./src/mouse/default_gutter_handler").GutterTooltip;
	type GutterKeyboardEvent = import( "./src/keyboard/gutter_handler").GutterKeyboardEvent;
	type HoverTooltip = import("./src/tooltip").HoverTooltip;
	type Tooltip = import("./src/tooltip").Tooltip;
	type TextInput = import("./src/keyboard/textinput").TextInput;
	type DiffChunk = import("./src/ext/diff/base_diff_view").DiffChunk;

	type AfterLoadCallback = (err: Error | null, module: unknown) => void;
	type LoaderFunction = (moduleName: string, afterLoad: AfterLoadCallback) => void;

	type ConfigOptions = import("./src/config").ConfigOptions;

	interface Theme {
		cssClass?: string;
		cssText?: string;
		$id?: string;
		padding?: number;
		isDark?: boolean;
		$showGutterCursorMarker?: boolean;
	}

	interface ScrollBar {
		setVisible(visible: boolean): void;

		[key: string]: any;
	}

	interface HScrollbar extends ScrollBar {
		setWidth(width: number): void;
	}

	interface VScrollbar extends ScrollBar {
		setHeight(width: number): void;
	}

	type LayerConfig = import("./src/layer/lines").LayerConfig;

	interface HardWrapOptions {
		/** First row of the range to process */
		startRow: number;
		/** Last row of the range to process */
		endRow: number;
		/** Whether to merge short adjacent lines that fit within the limit */
		allowMerge?: boolean;
		/** Maximum column width for line wrapping (defaults to editor's print margin) */
		column?: number;
	}

	interface CommandBarOptions {
		maxElementsOnTooltip: number;
		alwaysShow: boolean;
		showDelay: number;
		hideDelay: number;
	}

	type IRange = import("./src/range").IRange;

	type NewLineMode = import("./src/document").NewLineMode;

	interface MouseHandlerOptions {
		scrollSpeed: number;
		dragDelay: number;
		dragEnabled: boolean;
		focusTimeout: number;
	}

	interface EventsBase {
		[key: string]: any;
	}

	type EditSessionEvents = import("./src/edit_session").EditSessionEvents;
	type EditorEvents = import("./src/editor").EditorEvents;

	interface AcePopupEvents {
		"click": (e: MouseEvent, emitter: AcePopup) => void;
		"dblclick": (e: MouseEvent, emitter: AcePopup) => void;
		"tripleclick": (e: MouseEvent, emitter: AcePopup) => void;
		"quadclick": (e: MouseEvent, emitter: AcePopup) => void;
		"show": (e: undefined, emitter: AcePopup) => void;
		"hide": (e: undefined, emitter: AcePopup) => void;
		"select": (hide: boolean, emitter: AcePopup) => void;
		"changeHoverMarker": (e: any, emitter: AcePopup) => void;
	}

	type DocumentEvents = import("./src/document").DocumentEvents;

	type AnchorEvents = import("./src/anchor").AnchorEvents;

	type BackgroundTokenizerEvents = import("./src/background_tokenizer").BackgroundTokenizerEvents;
	type BackgroundTokenizer = import("./src/background_tokenizer").BackgroundTokenizer;

	interface PlaceHolderEvents {
		"cursorEnter": (e: any, emitter: import("./src/placeholder").PlaceHolder) => void;
		"cursorLeave": (e: any, emitter: import("./src/placeholder").PlaceHolder) => void;
	}

	interface TextEvents {
		"changeCharacterSize": (e: any, emitter: import("./src/layer/text").Text) => void;
	}

	type EventEmitter<T extends { [K in keyof T]: (...args: any[]) => any }> = import("./src/lib/event_emitter").EventEmitter<T>;


	type Point = import("./src/range").Point;
	type Position = Point;
	type Delta = import("./src/range").Delta;

	interface Annotation {
		row: number;
		column: number;
		text: string;
		type: string;
	}

	export interface MarkerGroupItem {
		range: Range;
		className: string;
	}

	type MarkerGroup = import("./src/marker_group").MarkerGroup;

	type BaseCompletion = import("./src/autocomplete").BaseCompletion;
	type SnippetCompletion = import("./src/autocomplete").SnippetCompletion;
	type ValueCompletion = import("./src/autocomplete").ValueCompletion;
	type Completion = import("./src/autocomplete").Completion;
	type CompleterCallback = import("./src/autocomplete").CompleterCallback;
	type Completer = import("./src/autocomplete").Completer;
	type CompletionOptions = import("./src/autocomplete").CompletionOptions;
	type CompletionProviderOptions = import("./src/autocomplete").CompletionProviderOptions;
	type GatherCompletionRecord = import("./src/autocomplete").GatherCompletionRecord;
	type CompletionCallbackFunction = import("./src/autocomplete").CompletionCallbackFunction;
	type CompletionProviderCallback = import("./src/autocomplete").CompletionProviderCallback;
	type AcePopupNavigation = import("./src/autocomplete").AcePopupNavigation;
	type FoldMode = import("./src/mode/folding/fold_mode").FoldMode;
	type SyntaxMode = import("./src/mode").SyntaxMode;
	type Command = import("./src/keyboard/hash_handler").Command;

	interface Outdent {
		checkOutdent(line: string, input: string): boolean;

		autoOutdent(doc: Document, row: number): number | undefined;
	}

	interface OptionsBase {
		[key: string]: any;
	}

	type OptionsProvider<T> = import("./src/lib/app_config").OptionsProvider<T>;

	type KeyBinding = import("./src/keyboard/keybinding").KeyBinding;

	interface CommandMap {
		[name: string]: Command;
	}

	type CommandManager = import("./src/commands/command_manager").CommandManager;


	interface SavedSelection {
		start: Point;
		end: Point;
		isBackwards: boolean;
	}

	var Selection: {
		new(session: EditSession): Selection;
	}

	/**
	 * Provider interface for code lens functionality
	 */
	interface CodeLenseProvider {
		/**
		 * Compute code lenses for the given edit session
		 * @param session The edit session to provide code lenses for
		 * @param callback Callback function that receives errors and code lenses
		 */
		provideCodeLenses: (session: EditSession, callback: (err: any, payload: CodeLense[]) => void) => void;
	}

	/**
	 * Represents a command associated with a code lens
	 */
	interface CodeLenseCommand {
		/**
		 * Command identifier that will be executed
		 */
		id?: string,
		/**
		 * Display title for the code lens
		 */
		title: string,
		/**
		 * Argument(s) to pass to the command when executed
		 */
		arguments?: any,
	}

	/**
	 * Represents a code lens - an actionable UI element displayed above a code line
	 */
	interface CodeLense {
		/**
		 * Starting position where the code lens should be displayed
		 */
		start: Point,
		/**
		 * Command to execute when the code lens is activated
		 */
		command?: CodeLenseCommand
	}

	type AcePopupEventsCombined = Ace.EditorEvents & Ace.AcePopupEvents;
	type AcePopupWithEditor = Ace.EventEmitter<AcePopupEventsCombined> & Ace.Editor;
	type InlineAutocompleteAction = import("./src/autocomplete").InlineAutocompleteAction;

	type TooltipCommandFunction<T> = (editor: Ace.Editor) => T;

	export interface TooltipCommand extends Ace.Command {
		enabled?: TooltipCommandFunction<boolean> | boolean,
		getValue?: TooltipCommandFunction<any>,
		type: "button" | "text" | "checkbox"
		iconCssClass?: string,
		cssClass?: string
	}

	export type CommandBarTooltip = import("./src/ext/command_bar").CommandBarTooltip;

	export type TokenizeResult = Array<Array<{
		className?: string,
		value: string,
	}>>

	export interface StaticHighlightOptions {
		/** Syntax mode (e.g., 'ace/mode/javascript'). Auto-detected from CSS class if not provided */
		mode?: string | SyntaxMode,
		/** Color theme (e.g., 'ace/theme/textmate'). Defaults to 'ace/theme/textmate' */
		theme?: string | Theme,
		/** Whether to trim whitespace from code content */
		trim?: boolean,
		/** Starting line number for display */
		firstLineNumber?: number,
		/** Whether to show line numbers gutter */
		showGutter?: boolean
	}

	export interface CommandBarEvents {
		"hide": (e: undefined, emitter: import("./src/ext/command_bar").CommandBarTooltip) => void;
		"show": (e: undefined, emitter: import("./src/ext/command_bar").CommandBarTooltip) => void;
		"alwaysShow": (e: boolean, emitter: import("./src/ext/command_bar").CommandBarTooltip) => void;
	}

	export interface OptionPanelEvents {
		"setOption": (e: { name: string, value: any }, emitter: import("./src/ext/options").OptionPanel) => void;
	}

	export interface ScrollbarEvents {
		"scroll": (e: { data: number }, emitter: ScrollBar) => void;
	}

	type EditorOptions = import("./src/editor").EditorOptions;
}

export declare const version: string;
export declare const config: Ace.Config;

export declare function require(name: string): any;

export declare function edit(el?: string | (Element & {
	env?: any;
	value?: any;
}) | null, options?: Partial<Ace.EditorOptions>): Ace.Editor;

export declare function createEditSession(text: Ace.Document | string, mode: Ace.SyntaxMode): Ace.EditSession;

export declare const VirtualRenderer: {
	new(container: HTMLElement, theme?: string): Ace.VirtualRenderer;
};
export declare const EditSession: {
	new(text: string | Ace.Document, mode?: Ace.SyntaxMode): Ace.EditSession;
};
export declare const UndoManager: {
	new(): Ace.UndoManager;
};
export declare const Editor: {
	new(renderer: Ace.VirtualRenderer, session?: Ace.EditSession, options?: Partial<Ace.EditorOptions>): Ace.Editor;
};
export declare const Range: {
	new(startRow: number, startColumn: number, endRow: number, endColumn: number): Ace.Range;
	fromPoints(start: Ace.Point, end: Ace.Point): Ace.Range;
	comparePoints(p1: Ace.Point, p2: Ace.Point): number;
};

export type InlineAutocomplete = Ace.InlineAutocomplete;
export type CommandBarTooltip = Ace.CommandBarTooltip;

declare global {
	interface Element {
		setAttribute(name: string, value: boolean): void;

		setAttribute(name: string, value: number): void;
	}
}

declare module "./src/ext/searchbox" {
	export interface SearchBox {
		editor: Ace.Editor;
	}
}

declare module "./src/placeholder" {
	export interface PlaceHolder extends Ace.EventEmitter<Ace.PlaceHolderEvents> {
	}
}

declare module "./src/snippets" {
	interface SnippetManager extends Ace.EventEmitter<any> {
	}
}

declare module "./src/ext/command_bar" {
	export interface CommandBarTooltip extends Ace.EventEmitter<Ace.CommandBarEvents> {
		$shouldHideMoreOptions?: boolean,
	}
}

declare module "./src/autocomplete/popup" {

	export interface AcePopup extends Ace.AcePopupWithEditor {
		setSelectOnHover: (val: boolean) => void,
		setRow: (line: number) => void,
		getRow: () => number,
		getHoveredRow: () => number,
		filterText: string,
		isOpen: boolean,
		isTopdown: boolean,
		autoSelect: boolean,
		data: Ace.Completion[],
		setData: (data: Ace.Completion[], filterText?: string) => void,
		getData: (row: number) => Ace.Completion,
		hide: () => void,
		anchor: "top" | "bottom",
		anchorPosition: Ace.Point,
		tryShow: (pos: any, lineHeight: number, anchor: "top" | "bottom", forceShow?: boolean) => boolean,
		$borderSize: number,
		show: (pos: any, lineHeight: number, topdownOnly?: boolean) => void,
		goTo: (where: Ace.AcePopupNavigation) => void,
		getTextLeftOffset: () => number,
		$imageSize: number,
		anchorPos: any,
		isMouseOver?: boolean,
		selectedNode?: HTMLElement,
	}
}

declare module "./src/mouse/mouse_event" {
	export interface MouseEvent {
		time?: number;
	}
}

declare module "./src/mouse/mouse_handler" {

	export interface MouseHandler {
		cancelDrag?: boolean
		//from DefaultHandlers
		$clickSelection?: Ace.Range,
		mousedownEvent?: Ace.MouseEvent,
		startSelect?: (pos?: Ace.Point, waitForClickSelection?: boolean) => void,
		select?: () => void
		$lastScroll?: { t: number, vx: number, vy: number, allowed: number }
		selectEnd?: () => void
		$tooltip?: Ace.GutterTooltip
	}
}

declare module "./src/ext/options" {
	export interface OptionPanel extends Ace.EventEmitter<Ace.OptionPanelEvents> {
	}
}

declare module "./src/tooltip" {
	export interface HoverTooltip {
		row: number;
	}
}

declare module "./src/mouse/default_gutter_handler" {
	export interface GutterHandler {
	}
}

declare module "./src/ext/diff/base_diff_view" {
	export interface BaseDiffView extends Ace.OptionsProvider<import("ace-code/src/ext/diff").DiffViewOptions> {
	}
}

