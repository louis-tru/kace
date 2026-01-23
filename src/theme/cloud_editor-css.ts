import * as dom from "../lib/dom";
dom.importCss({

".ace-cloud_editor .ace_gutter": {
	backgroundColor: "#ffffff",
	textColor: "#3a3a42",
},

".ace-cloud_editor .ace_tooltip-marker-error.ace_tooltip-marker": {
	backgroundColor: "#d13212",
},
".ace-cloud_editor .ace_tooltip-marker-security.ace_tooltip-marker": {
	backgroundColor: "#d13212",
},
".ace-cloud_editor .ace_tooltip-marker-warning.ace_tooltip-marker": {
	backgroundColor: "#906806",
},

".ace-cloud_editor .ace_print-margin": {
	width: 1,
	backgroundColor: "#697077",
},

".ace-cloud_editor": {
	backgroundColor: "#ffffff",
	textColor: "#3a3a42",
},

".ace-cloud_editor .ace_cursor": {
	textColor: "#3a3a42",
},

".ace-cloud_editor .ace_marker-layer .ace_selection": {
	backgroundColor: "#bfceff",
},

".ace-cloud_editor.ace_multiselect .ace_selection.ace_start": {
	boxShadow: "0 0 3 #ffffff",
	borderRadius: 2,
},

".ace-cloud_editor .ace_marker-layer .ace_step": {
	backgroundColor: "#697077",
},

".ace-cloud_editor .ace_marker-layer .ace_bracket": {
	margin: [0,0,0,-1],
	border: "1 #697077",
},

".ace-cloud_editor .ace_gutter-cursor,.ace-cloud_editor .ace_marker-layer .ace_active-line": {
	// box-sizing: "border-box",
	borderTop: "1 #9191ac",
	borderBottom: "1 #9191ac",
},

".ace-cloud_editor .ace_gutter-cursor": {
	// position: "absolute",
	width: "100%",
},

".ace-cloud_editor .ace_marker-layer .ace_selected-word": {
	border: "1 #bfceff",
},

".ace-cloud_editor .ace_fold": {
	backgroundColor: "#0E45B4",
	borderColor: "#3a3a42",
},

".ace-cloud_editor .ace_keyword": {
	textColor: "#9749d1",
},

".ace-cloud_editor .ace_meta.ace_tag": {
	textColor: "#0E45B4",
},

".ace-cloud_editor .ace_constant": {
	textColor: "#A16101",
},

".ace-cloud_editor .ace_constant.ace_numeric": {
	textColor: "#A16101",
},

".ace-cloud_editor .ace_constant.ace_character.ace_escape": {
	textColor: "#BD1880",
},

".ace-cloud_editor .ace_support.ace_function": {
	textColor: "#A81700",
},

".ace-cloud_editor .ace_support.ace_class": {
	textColor: "#A16101",
},

".ace-cloud_editor .ace_storage": {
	textColor: "#9749d1",
},

".ace-cloud_editor .ace_invalid.ace_illegal": {
	textColor: "#ffffff",
	backgroundColor: "#0E45B4",
},

".ace-cloud_editor .ace_invalid.ace_deprecated": {
	textColor: "#ffffff",
	backgroundColor: "#A16101",
},

".ace-cloud_editor .ace_string": {
	textColor: "#207A7F",
},

".ace-cloud_editor .ace_string.ace_regexp": {
	textColor: "#207A7F",
},

".ace-cloud_editor .ace_comment,.ace-cloud_editor .ace_ghost_text": {
	textColor: "#697077",
	opacity: 1,
},

".ace-cloud_editor .ace_variable": {
	textColor: "#0E45B4",
},

".ace-cloud_editor .ace_meta.ace_selector": {
	textColor: "#9749d1",
},

".ace-cloud_editor .ace_entity.ace_other.ace_attribute-name": {
	textColor: "#A16101",
},

".ace-cloud_editor .ace_entity.ace_name.ace_function": {
	textColor: "#A81700",
},

".ace-cloud_editor .ace_entity.ace_name.ace_tag": {
	textColor: "#0E45B4",
},

".ace-cloud_editor .ace_heading": {
	textColor: "#A81700",
},

".ace-cloud_editor .ace_xml-pe": {
	textColor: "#A16101",
},
".ace-cloud_editor .ace_doctype": {
	textColor: "#0E45B4",
},

".ace-cloud_editor .ace_tooltip": {
	backgroundColor: "#ffffff",
	textColor: "#3a3a42",
},

".ace-cloud_editor .ace_icon_svg.ace_error,.ace-cloud_editor .ace_icon_svg.ace_error_fold": {
	backgroundColor: "#d13212",
},
".ace-cloud_editor .ace_icon_svg.ace_security,.ace-cloud_editor .ace_icon_svg.ace_security_fold": {
	backgroundColor: "#d13212",
},
".ace-cloud_editor .ace_icon_svg.ace_warning,.ace-cloud_editor .ace_icon_svg.ace_warning_fold": {
	backgroundColor: "#906806",
},
".ace-cloud_editor .ace_icon_svg.ace_info": {
	backgroundColor: "#0073bb",
},
".ace-cloud_editor .ace_icon_svg.ace_hint": {
	backgroundColor: "#0073bb",
},
".ace-cloud_editor .ace_highlight-marker": {
	background: null, // "none"
	border: "1 #0E45B4",
},
".ace-cloud_editor .ace_tooltip.ace_hover-tooltip:focus > div": {
	// outline: "1 #0073bb",
},
".ace-cloud_editor .ace_snippet-marker": {
	backgroundColor: "#CED6E0",
	borderWidth: 0,
},

".ace-cloud_editor.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line": {
	backgroundColor: "#f2f3f3",
	border: "1.5 #0F68AE",
},
".ace-cloud_editor.ace_editor.ace_autocomplete .ace_line-hover": {
	border: "1 #16191f",
	backgroundColor: "#f2f3f3",
},
".ace-cloud_editor.ace_editor.ace_autocomplete .ace_completion-meta": {
	textColor: "#545b64",
	opacity: 1,
},
".ace-cloud_editor.ace_editor.ace_autocomplete .ace_completion-highlight": {
	textColor: "#0F68AE",
},
".ace-cloud_editor.ace_editor.ace_autocomplete": {
	boxShadow: ["0 1 1 #001c244d", "1 1 1 #001c2426", "-1 1 1 #001c2426"],
	lineHeight: 1.5,
	border: "1 #eaeded",
	backgroundColor: "#ffffff",
	textColor: "#16191f",
},

});