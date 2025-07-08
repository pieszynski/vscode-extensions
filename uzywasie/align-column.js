// eslint-disable-next-line no-unused-vars
const vscode = require("vscode"); // niby niepotrzebne, ale jsdoc nie działa bez tego

/**
 * Ustawia zaznaczenia w aktywnym edytorze w kolumnie
 * 
 * @param {vscode.TextEditor} editor
 */
function alignIntoColumn(editor) {
	const userSelected = editor.selections;

	// znalezienie najbardziej odległego w prawo
	const emax = userSelected
		.map(m => m.start)
		.sort((a, b) => b.character - a.character)
		[0]
		;

	// zmiany od ostatniej linii do pierwszej
	const modifiable = userSelected
		.map(m => m.start)
		.sort((a, b) => b.line - a.line)
		.reduce(reduceMultipleInOneLine, [])
		;
	
	editor.edit(b => {
		for (const mo of modifiable) {
			const charsToAdd = emax.character - mo.character;
			if (charsToAdd > 0) {
				const spaces = ''.padEnd(charsToAdd);
				b.insert(mo, spaces);
			}
		}
	});
}

/**
 * Redukuje wielokrotne wystąpienia zaznaczenia w tej samej linii. 
 * Wybierane jest tylko to najbardziej po lewej.
 * 
 * @param {vscode.Position[]} acc poprzedni akumulator
 * @param {vscode.Position} val aktualna wartość
 * @returns nowy akumulator
 */
function reduceMultipleInOneLine(acc, val) {
	let doAdd = true;

	for (let i = 0; i < acc.length; i++) {
		const element = acc[i];
		if (element.line === val.line) {
			if (element.character <= val.character) {
				doAdd = false;
			} else {
				acc.splice(i, 1);
			}
			break;
		}
	}

	if (doAdd) {
		acc.push(val);
	}

	return acc;
}

module.exports = {
	alignIntoColumn,
	internal: {
		reduceMultipleInOneLine
	}
};
