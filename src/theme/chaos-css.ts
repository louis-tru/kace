import * as dom from "../lib/dom";
dom.importCss({
".ace-chaos .ace_gutter": {
	backgroundColor: "#141414",
	textColor: "#595959",
	borderRight: "1 #282828",
},
".ace-chaos .ace_gutter-cell.ace_warning": {
	background: null, //"none",
	backgroundColor: "#FC0",
	borderLeft: "0 #000",
	paddingLeft: 0,
	textColor: "#000",
},
".ace-chaos .ace_gutter-cell.ace_error": {
	// background-position: "-6 center",
	background: null, //"none",
	backgroundColor: "#F10",
	borderLeft: "0 #000",
	paddingLeft: 0,
	textColor: "#000",
},
".ace-chaos .ace_print-margin": {
	borderLeft: "1 #555",
	marginRight: 0,//right: "0",
	backgroundColor: "#1D1D1D",
},
".ace-chaos": {
	backgroundColor: "#161616",
	textColor: "#E6E1DC",
},

".ace-chaos .ace_cursor": {
	borderLeft: "2 #FFFFFF",
},
".ace-chaos .ace_cursor.ace_overwrite": {
	borderLeftWidth: 0,
	borderBottom: "1 #FFFFFF",
},
".ace-chaos .ace_marker-layer .ace_selection": {
	backgroundColor: "#494836",
},
".ace-chaos .ace_marker-layer .ace_step": {
	backgroundColor: "rgb(198, 219, 174)",
},
".ace-chaos .ace_marker-layer .ace_bracket": {
	margin: [-1, 0, 0, -1],
	border: "1 #FCE94F",
},
".ace-chaos .ace_marker-layer .ace_active-line": {
	backgroundColor: "#333",
},
".ace-chaos .ace_gutter-active-line": {
	backgroundColor: "#222",
},
".ace-chaos .ace_invisible": {
	textColor: "#404040",
},
".ace-chaos .ace_keyword": {
	textColor: "#00698F",
},
".ace-chaos .ace_keyword.ace_operator": {
	textColor: "#FF308F",
},
".ace-chaos .ace_constant": {
	textColor: "#1EDAFB",
},
".ace-chaos .ace_constant.ace_language": {
	textColor: "#FDC251",
},
".ace-chaos .ace_constant.ace_library": {
	textColor: "#8DFF0A",
},
".ace-chaos .ace_constant.ace_numeric": {
	textColor: "#58C554",
},
".ace-chaos .ace_invalid": {
	textColor: "#FFFFFF",
	backgroundColor: "#990000",
},
".ace-chaos .ace_invalid.ace_deprecated": {
	textColor: "#FFFFFF",
	backgroundColor: "#990000",
},
".ace-chaos .ace_support": {
	textColor: "#999",
},
".ace-chaos .ace_support.ace_function": {
	textColor: "#00AEEF",
},
".ace-chaos .ace_function": {
	textColor: "#00AEEF",
},
".ace-chaos .ace_string": {
	textColor: "#58C554",
},
".ace-chaos .ace_comment": {
	textColor: "#555",
	fontSlant: "italic",
	paddingBottom: 0,
},
".ace-chaos .ace_variable": {
	textColor: "#997744",
},
".ace-chaos .ace_meta.ace_tag": {
	textColor: "#BE53E6",
},
".ace-chaos .ace_entity.ace_other.ace_attribute-name": {
	textColor: "#FFFF89",
},
".ace-chaos .ace_markup.ace_underline": {
	// text-decoration: "underline",
},
".ace-chaos .ace_fold-widget": {
	textAlign: "center",
},

".ace-chaos .ace_fold-widget:hover": {
	textColor: "#777",
},

".ace-chaos .ace_fold-widget.ace_start,.ace-chaos .ace_fold-widget.ace_end,.ace-chaos .ace_fold-widget.ace_closed": {
	background: null, // "none !important"
	border: "0 #000",
	boxShadow: "0 0 0 #000", //"none",
},

".ace-chaos .ace_fold-widget.ace_start:after": {
	// content: "'▾'",
},

".ace-chaos .ace_fold-widget.ace_end:after": {
	// content: "'▴'",
},

".ace-chaos .ace_fold-widget.ace_closed:after": {
	// content: "'‣'",
},

".ace-chaos .ace_indent-guide": {
	borderRight: "1  #333333",
	marginRight: -1,
},

".ace-chaos .ace_indent-guide-active": {
	borderRight: "1  #afafaf",
	marginRight: -1,
},

".ace-chaos .ace_fold": {
	backgroundColor: "#222", 
	borderRadius: 3, 
	textColor: "#7AF",
	border: "0 #000", 
},
".ace-chaos .ace_fold:hover": {
	backgroundColor: "#CCC", 
	textColor: "#000",
},
});
