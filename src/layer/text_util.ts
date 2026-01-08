// Tokens for which Ace just uses a simple TextNode and does not add any special className.
const textTokens = new Set(["text", "rparen", "lparen"]);

export function isTextToken(tokenType: string): boolean {
	return textTokens.has(tokenType);
};
