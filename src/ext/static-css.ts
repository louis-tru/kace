
import * as dom from '../lib/dom';

dom.importCss({

".ace_static_highlight": {
	fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', 'source-code-pro', 'Droid Sans Mono', monospace",
	fontSize: 12,
	whiteSpace: "preWrap",
},

".ace_static_highlight .ace_gutter": {
	width: 24, // 2em, 12 * 2
	textAlign: "right",
	padding: [0, 3, 0, 0],
	marginRight: 3,
	// contain: "none",
},

".ace_static_highlight.ace_show_gutter .ace_line": {
	paddingLeft: 12 * 2.6, // 2.6em
},

".ace_static_highlight .ace_line": {
	// position: "relative"
},

".ace_static_highlight .ace_gutter-cell": {
	// "-moz-user-select": "-moz-none",
	// "-khtml-user-select": "none",
	// "-webkit-user-select": "none",
	// "user-select": "none",
	// "top": 0,
	// "bottom": 0,
	// "left": 0,
	// "position": "absolute",
	align: "bottom",
},

".ace_static_highlight .ace_gutter-cell:before": {
	// "content": "counter(ace_line, decimal)",
	// "counter-increment": "ace_line",
},
// ".ace_static_highlight": {
	// counterReset: "ace_line",
// }
});