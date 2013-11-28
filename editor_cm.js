// Define an extended mixed-mode that understands vbscript and
// leaves mustache/handlebars embedded templates in html mode
var mixedMode = {
   name: "htmlmixed",
   scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,mode: null}]
};
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {mode: mixedMode, tabMode: "indent"});
function showHTML(msg) {
    editor.setValue(msg);
}
function getHTML(){
	return editor.getValue();
}

