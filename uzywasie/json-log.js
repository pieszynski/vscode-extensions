const vscode = require("vscode");

/**
 * 
 * @param {vscode.TextEditor} editor 
 */
function extractMessageFromJsonl(editor) {
	
	editor.edit((mod) => {
		for (let i = 0; i < editor.document.lineCount; i++) {
			const line = editor.document.lineAt(i);
			try {
				const json = JSON.parse(line.text);
				const nextText = json && (json.message || json["@m"]);
				if (nextText) {
					mod.replace(line.range, nextText);
				}
			} catch {
				continue;
			}
		}
	});
}

module.exports = {
	extractMessageFromJsonl
};