
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

	interface ScreenCoordinates {
		row: number,
		column: number,
		side?: 1 | -1,
		offsetX?: number
	}

	type IRange = import("./src/range").IRange;

	interface LineWidget {
		editor?: Editor,
		// el?: HTMLElement;
		el?: import('quark').Box;
		rowCount?: number;
		hidden?: boolean;
		_inDocument?: boolean;
		column?: number;
		row: number;
		$oldWidget?: LineWidget,
		session?: EditSession,
		html?: string,
		text?: string,
		className?: string,
		coverGutter?: boolean,
		pixelHeight?: number,
		$fold?: Fold,
		type?: any,
		destroy?: () => void;
		coverLine?: boolean,
		fixedWidth?: boolean,
		fullWidth?: boolean,
		screenWidth?: number,
		rowsAbove?: number,
		lenses?: CodeLenseCommand[],
	}

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

	interface SelectionEvents {
		/**
		 * Emitted when the cursor position changes.
		 **/
		"changeCursor": (e: undefined, emitter: Selection) => void;
		/**
		 * Emitted when the cursor selection changes.
		 **/
		"changeSelection": (e: undefined, emitter: Selection) => void;
	}

	interface MultiSelectionEvents extends SelectionEvents {
		"multiSelect": (e: undefined, emitter: Selection) => void;
		"addRange": (e: { range: Range }, emitter: Selection) => void;
		"removeRange": (e: { ranges: Range[] }, emitter: Selection) => void;
		"singleSelect": (e: undefined, emitter: Selection) => void;
	}

	interface PlaceHolderEvents {
		"cursorEnter": (e: any, emitter: import("./src/placeholder").PlaceHolder) => void;
		"cursorLeave": (e: any, emitter: import("./src/placeholder").PlaceHolder) => void;
	}

	interface TextEvents {
		"changeCharacterSize": (e: any, emitter: import("./src/layer/text").Text) => void;
	}

	type EventEmitter<T extends { [K in keyof T]: (...args: any[]) => any }> = import("./src/lib/event_emitter").EventEmitter<T>;

	interface SearchOptions {
		/**The string or regular expression you're looking for*/
		needle: string | RegExp;
		preventScroll: boolean;
		/**Whether to search backwards from where cursor currently is*/
		backwards: boolean;
		/**The starting [[Range]] or cursor position to begin the search*/
		start: Range;
		/**Whether or not to include the current line in the search*/
		skipCurrent: boolean;
		/**The [[Range]] to search within. Set this to `null` for the whole document*/
		range: Range | null;
		preserveCase: boolean;
		/**Whether the search is a regular expression or not*/
		regExp: boolean;
		/**Whether the search matches only on whole words*/
		wholeWord: boolean;
		/**Whether the search ought to be case-sensitive*/
		caseSensitive: boolean;
		/**Whether to wrap the search back to the beginning when it hits the end*/
		wrap: boolean;
		re: any;
		/**true, if needle has \n or \r\n*/
		$isMultiLine: boolean;
		/**
		 * internal property, determine if browser supports unicode flag
		 * @private
		 * */
		$supportsUnicodeFlag: boolean;
	}

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

	export interface Command {
		name?: string;
		bindKey?: string | { mac?: string, win?: string };
		readOnly?: boolean;
		exec?: (editor?: Editor | any, args?: any) => void;
		isAvailable?: (editor: Editor) => boolean;
		description?: string,
		multiSelectAction?: "forEach" | "forEachLine" | Function,
		scrollIntoView?: true | "cursor" | "center" | "selectionPart" | "animate" | "selection" | "none",
		aceCommandGroup?: string,
		passEvent?: boolean,
		level?: number,
		action?: string,
	}

	type CommandLike = Command | ((editor: Editor) => void) | ((sb: SearchBox) => void);

	type KeyboardHandler = Partial<import("./src/keyboard/hash_handler").HashHandler> & {
		attach?: (editor: Editor) => void;
		detach?: (editor: Editor) => void;
		getStatusText?: (editor?: any, data?: any) => string;
	}

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

	type HighlightRule = ({ defaultToken: string } | { include: string } | { todo: string } | {
		token: string | string[] | ((value: string) => string);
		regex: string | RegExp;
		next?: string | (() => void);
		push?: string;
		comment?: string;
		caseInsensitive?: boolean;
		nextState?: string;
	}) & { [key: string]: any };

	type HighlightRulesMap = Record<string, HighlightRule[]>;

	type KeywordMapper = (keyword: string) => string;

	interface HighlightRules {
		$rules: HighlightRulesMap;
		$embeds: string[];
		$keywords: any[];
		$keywordList: string[];

		addRules(rules: HighlightRulesMap, prefix?: string): void;

		getRules(): HighlightRulesMap;

		embedRules(rules: (new () => HighlightRules) | HighlightRulesMap, prefix: string, escapeRules?: boolean, append?: boolean): void;

		getEmbeds(): string[];

		normalizeRules(): void;

		createKeywordMapper(map: Record<string, string>, defaultToken?: string, ignoreCase?: boolean, splitChar?: string): KeywordMapper;
	}

	type FoldMode = import("./src/mode/folding/fold_mode").FoldMode;

	type BehaviorAction = (state: string | string[], action: string, editor: Editor, session: EditSession, text: string | Range) => ({
		text: string,
		selection: number[]
	} | Range) & { [key: string]: any } | undefined;
	type BehaviorMap = Record<string, Record<string, BehaviorAction>>;

	interface Behaviour {
		$behaviours: { [behaviour: string]: any }

		add(name: string, action: string, callback: BehaviorAction): void;

		addBehaviours(behaviours: BehaviorMap): void;

		remove(name: string): void;

		inherit(mode: SyntaxMode | (new () => SyntaxMode), filter: string[]): void;

		getBehaviours(filter?: string[]): BehaviorMap;
	}

	interface Outdent {
		checkOutdent(line: string, input: string): boolean;

		autoOutdent(doc: Document, row: number): number | undefined;
	}

	interface SyntaxMode {
		/**
		 * quotes used by language mode
		 */
		$quotes: { [quote: string]: string };
		HighlightRules: {
			new(config?: any): HighlightRules
		}; //TODO: fix this
		foldingRules?: FoldMode;
		$behaviour?: Behaviour;
		$defaultBehaviour?: Behaviour;
		/**
		 * characters that indicate the start of a line comment
		 */
		lineCommentStart?: string;
		/**
		 * characters that indicate the start and end of a block comment
		 */
		blockComment?: { start: string, end: string }
		tokenRe?: RegExp;
		nonTokenRe?: RegExp;
		/**
		 * An object containing conditions to determine whether to apply matching quote or not.
		 */
		$pairQuotesAfter: { [quote: string]: RegExp }
		$tokenizer: Tokenizer;
		$highlightRules: HighlightRules;
		$embeds?: string[];
		$modes?: SyntaxMode[];
		$keywordList?: string[];
		$highlightRuleConfig?: any;
		completionKeywords: string[];
		transformAction: BehaviorAction;
		path?: string;

		getTokenizer(): Tokenizer;

		toggleCommentLines(state: string | string[],
						   session: EditSession,
						   startRow: number,
						   endRow: number): void;

		toggleBlockComment(state: string | string[],
						   session: EditSession,
						   range: Range,
						   cursor: Point): void;

		getNextLineIndent(state: string | string[], line: string, tab: string): string;

		checkOutdent(state: string | string[], line: string, input: string): boolean;

		autoOutdent(state: string | string[], doc: EditSession, row: number): void;

		// TODO implement WorkerClient types
		createWorker(session: EditSession): any;

		createModeDelegates(mapping: { [key: string]: string }): void;

		getKeywords(append?: boolean): Array<string | RegExp>;

		getCompletions(state: string | string[],
					   session: EditSession,
					   pos: Point,
					   prefix: string): Completion[];

		$getIndent(line: string): string;

		$createKeywordList(): string[];

		$delegator(method: string, args: IArguments, defaultHandler: any): any;

	}

	interface OptionsBase {
		[key: string]: any;
	}

	type OptionsProvider<T> = import("./src/lib/app_config").OptionsProvider<T>;

	type KeyBinding = import("./src/keyboard/keybinding").KeyBinding;

	interface CommandMap {
		[name: string]: Command;
	}

	type execEventHandler = (obj: {
		editor: Editor,
		command: Command,
		args: any[]
	}, emitter: CommandManager) => void;

	interface CommandManagerEvents {
		"exec": execEventHandler
		"afterExec": execEventHandler;
		"commandUnavailable": execEventHandler;
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

	interface MultiSelectProperties {
		ranges: Ace.Range[] | null;
		rangeList: Ace.RangeList | null;

		/**
		 * Adds a range to a selection by entering multiselect mode, if necessary.
		 * @param {Ace.Range} range The new range to add
		 * @param {Boolean} [$blockChangeEvents] Whether or not to block changing events
		 **/
		addRange(range: Ace.Range, $blockChangeEvents?: boolean): any;

		inMultiSelectMode: boolean;

		/**
		 * @param {Ace.Range} [range]
		 **/
		toSingleRange(range?: Ace.Range): void;

		/**
		 * Removes a Range containing pos (if it exists).
		 * @param {Ace.Point} pos The position to remove, as a `{row, column}` object
		 **/
		substractPoint(pos: Ace.Point): any;

		/**
		 * Merges overlapping ranges ensuring consistency after changes
		 **/
		mergeOverlappingRanges(): void;

		/**
		 * @param {Ace.Range} range
		 */
		$onAddRange(range: Ace.Range): void;

		rangeCount: number;

		/**
		 *
		 * @param {Ace.Range[]} removed
		 */
		$onRemoveRange(removed: Ace.Range[]): void;

		/**
		 * adds multicursor support to selection
		 */
		$initRangeList(): void;

		/**
		 * Returns a concatenation of all the ranges.
		 * @returns {Ace.Range[]}
		 **/
		getAllRanges(): Ace.Range[];

		/**
		 * Splits all the ranges into lines.
		 **/
		splitIntoLines(): void;

		/**
		 */
		joinSelections(): void;

		/**
		 **/
		toggleBlockSelection(): void;

		/**
		 *
		 * Gets list of ranges composing rectangular block on the screen
		 *
		 * @param {Ace.ScreenCoordinates} screenCursor The cursor to use
		 * @param {Ace.ScreenCoordinates} screenAnchor The anchor to use
		 * @param {Boolean} [includeEmptyLines] If true, this includes ranges inside the block which are empty due to clipping
		 * @returns {Ace.Range[]}
		 **/
		rectangularRangeBlock(screenCursor: Ace.ScreenCoordinates, screenAnchor: Ace.ScreenCoordinates, includeEmptyLines?: boolean): Ace.Range[];

		// _eventRegistry?: any;
		index?: number;
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

	export interface Operation {
		command: {
			name?: string;
		};
		args: any;
		selectionBefore?: Range | Range[];
		selectionAfter?: Range | Range[];
		docChanged?: boolean;
		selectionChanged?: boolean;
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

	export interface TextInputAriaOptions {
		activeDescendant?: string;
		role?: string;
		setLabel?: boolean;
		inline?: boolean;
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

declare module "./src/placeholder" {
	export interface PlaceHolder extends Ace.EventEmitter<Ace.PlaceHolderEvents> {
	}
}

declare module "./src/line_widgets" {
	export interface LineWidgets {
		lineWidgets: Ace.LineWidget[];
		editor: Ace.Editor;
	}
}

declare module "./src/selection" {
	export interface Selection extends Ace.EventEmitter<Ace.MultiSelectionEvents>, Ace.MultiSelectProperties {
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

declare module "./src/commands/command_manager" {
	export interface CommandManager extends Ace.EventEmitter<Ace.CommandManagerEvents> {
		$checkCommandState?: boolean
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

