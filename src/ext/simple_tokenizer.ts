/**
 * ## Simple tokenizer extension
 *
 * Provides standalone tokenization functionality that can parse code content using Ace's highlight rules without
 * requiring a full editor instance. This is useful for generating syntax-highlighted tokens for external rendering,
 * static code generation, or testing tokenization rules. The tokenizer processes text line by line and returns
 * structured token data with CSS class names compatible with Ace themes.
 *
 * **Usage:**
 * ```javascript
 * const { tokenize } = require("ace/ext/simple_tokenizer");
 * const { JsonHighlightRules } = require("ace/mode/json_highlight_rules");
 *
 * const content = '{"name": "value"}';
 * const tokens = tokenize(content, new JsonHighlightRules());
 * // Returns: [[{className: "ace_paren ace_lparen", value: "{"}, ...]]
 * ```
 *
 * @module
 */

"use strict";
import { Tokenizer } from "../tokenizer";
import {isTextToken} from "../layer/text_util";
import {HighlightRules} from "../mode";

class SimpleTokenizer {
	_lines: string[];
	_states: string[];
	_tokenizer: Tokenizer;
	/**
	 * @param {string} content 
	 * @param {Tokenizer} tokenizer 
	 */
	constructor(content: string, tokenizer: Tokenizer) {
		this._lines = content.split(/\r\n|\r|\n/);
		this._states = [];
		this._tokenizer = tokenizer;
	}   

	/**
	 * @param {number} row 
	 * @returns {Token[]}
	 */
	getTokens(row: number) {
		const line = this._lines[row];
		const previousState = this._states[row - 1];
		
		const data = this._tokenizer.getLineTokens(line, previousState);
		this._states[row] = data.state as string;
		return data.tokens;
	}

	/**
	 * @returns {number} 
	 */
	getLength() {
		return this._lines.length;
	}
}

export type TokenizeResult = Array<Array<{
	className?: string,
	value: string,
}>>

/**
 * Parses provided content according to provided highlighting rules and return tokens. 
 * Tokens either have the className set according to Ace themes or have no className if they are just pure text tokens.
 * Result is a list of list of tokens, where each line from the provided content is a separate list of tokens.
 * 
 * @param {string} content to tokenize 
 * @param {HighlightRules} highlightRules defining the language grammar 
 * @returns {TokenizeResult} tokenization result containing a list of token for each of the lines from content
 */
export function tokenize(content: string, highlightRules: HighlightRules) {
	const tokenizer = new SimpleTokenizer(content, new Tokenizer(highlightRules.getRules()));
	
	let result: TokenizeResult = [];
	for (let lineIndex = 0; lineIndex < tokenizer.getLength(); lineIndex++) {
		const lineTokens = tokenizer.getTokens(lineIndex);
		result.push(lineTokens.map((token) => ({
			className: isTextToken(token.type) ? undefined : "ace_" + token.type.replace(/\./g, " ace_"),
			value: token.value
		})));
	}
	return result;
}