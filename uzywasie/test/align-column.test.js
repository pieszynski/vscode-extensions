const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');
const aligncol = require("../align-column");

suite('Align Column Test Suite', () => {
	vscode.window.showInformationMessage('Start align column tests.');

	test('Leave different lines', () => {
		// arrange
		const data = [
			new vscode.Position(1, 5),
		]

		// act
		const res = data.reduce(aligncol.internal.reduceMultipleInOneLine, []);

		// assert
		assert.deepStrictEqual(res, [
			new vscode.Position(1, 5),
		]);
	});

	test('Remove same line multiple selections', () => {
		// arrange
		const data = [
			new vscode.Position(1, 5),
			new vscode.Position(4, 5),
			new vscode.Position(4, 7),
			new vscode.Position(2, 5),
			new vscode.Position(2, 2),
		]

		// act
		const res = data.reduce(aligncol.internal.reduceMultipleInOneLine, []);

		// assert
		assert.deepStrictEqual(res, [
			new vscode.Position(1, 5),
			new vscode.Position(4, 5),
			new vscode.Position(2, 2),
		]);
	});
});
