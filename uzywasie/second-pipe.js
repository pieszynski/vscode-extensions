const vscode = require("vscode");

class SecondPipe {
	/**
	 * Convert data in editor to new format
	 * @param {vscode.TextEditor} editor 
	 * @param {string} joinWith 
	 */
	convertAllInEditor(editor, joinWith = '|') {
		editor.edit((mod) => {
			if (editor.selection.isEmpty) {
				let oldText = editor.document.getText();
				var allRange = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(oldText.length));
				let newText = this.replaceOddPipes(oldText, joinWith);
				mod.replace(allRange, newText);
			}
			else {
				for (let sel of editor.selections) {
					let partOfText = editor.document.getText(sel);
					let newPartOfText = this.replaceOddPipes(partOfText, joinWith);
					mod.replace(sel, newPartOfText);
				}
			}
		});
	}
	/**
	 * 
	 * @param {string} text 
	 * @param {string} joinWith 
	 * @returns 
	 */
	replaceOddPipes(text, joinWith = '|') {
		if (null === text) {
			return text;
		}
		let response = text
			.split('|')
			.reduce((accu, curr, idx) => {
			if (0 === idx % 2) {
				accu.last = accu.tab.push(curr) - 1;
			}
			else {
				accu.tab[accu.last] += '=' + curr;
			}
			return accu;
		}, { last: 0, tab: [] })
			.tab
			.join(joinWith);
		return response;
	}
}
module.exports = {
	SecondPipe
};