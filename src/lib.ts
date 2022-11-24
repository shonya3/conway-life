import { Cell, CellPosition, CellState, LifeBoard } from './types';
export const getSiblings = (b: LifeBoard, cell: Cell) => {
	const { x, y } = cell.position;

	const cells = [
		getMatrixElement(b, x - 1, y + 1),
		getMatrixElement(b, x, y + 1),
		getMatrixElement(b, x + 1, y + 1),
		getMatrixElement(b, x - 1, y),
		getMatrixElement(b, x + 1, y),
		getMatrixElement(b, x - 1, y - 1),
		getMatrixElement(b, x, y - 1),
		getMatrixElement(b, x + 1, y - 1),
	];
	const result: Cell[] = [];

	cells.forEach(getterCell => {
		const alreadyExists = result.find(
			cell => cell.position.x === getterCell.position.x && cell.position.y === getterCell.position.y
		);
		if (!alreadyExists) {
			result.push(getterCell);
		}
	});

	return result;
};

export const getAliveCells = (cells: Cell[]): Cell[] => cells.filter(cell => cell.state === CellState.Alive);

export const createCell = ({ x, y }: CellPosition, state: CellState = CellState.Dead) => {
	return {
		state,
		position: { x, y },
		recalcedOnStep: 0,
	};
};

export const calcNextCellState = (board: LifeBoard, cell: Cell, step: number = 1): Cell => {
	let aliveSiblingsCounter = 0;
	const siblings = getSiblings(board, cell);
	const aliveSiblings = getAliveCells(siblings);

	aliveSiblingsCounter = aliveSiblings.length;

	switch (cell.state) {
		case CellState.Alive: {
			const nextState =
				aliveSiblingsCounter === 2 || aliveSiblingsCounter === 3 ? CellState.Alive : CellState.Dead;

			const newCell: Cell = {
				state: nextState,
				position: cell.position,
			};

			return newCell;
		}

		case CellState.Dead: {
			const nextState = aliveSiblingsCounter === 3 ? CellState.Alive : CellState.Dead;
			const newCell: Cell = {
				state: nextState,
				position: cell.position,
			};

			return newCell;
		}
	}
};

export const calcNextStep = (board: LifeBoard): LifeBoard => {
	const newBoard: LifeBoard = Array.from({ length: board.length }, () => Array.from({ length: board[0].length }));

	for (let i = 0; i < newBoard.length; i++) {
		for (let j = 0; j < newBoard[0].length; j++) {
			const cell = board[i][j];
			newBoard[i][j] = calcNextCellState(board, cell);
		}
	}

	return newBoard;
};

export const getAliveCellsOnBoard = (board: LifeBoard): Cell[] => board.flatMap(cells => getAliveCells(cells));

export const iterateBoard = function* (board: LifeBoard) {
	for (const row of board) {
		for (const cell of row) {
			yield cell;
		}
	}
};

export const safeIndex = (length: number, index: number): number => {
	if (index === -1) return length - 1;
	else if (index === length) return 0;
	else return index;
};

export const getMatrixElement = <T>(matrix: T[][], x: number, y: number): T => {
	const xLen = matrix.length;
	const yLen = matrix[0].length;

	return matrix[safeIndex(xLen, x)][safeIndex(yLen, y)];
};

export function initBoard(size: number): LifeBoard {
	const board: LifeBoard = Array.from({ length: size }, () => Array.from({ length: size }));
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			let state = CellState.Dead;
			// if ((x === 0 && y === 1) || (x === 1 && y === 1) || (x === 2 && y === 1)) state = CellState.Alive;

			board[x][y] = createCell({ x, y }, state);
		}
	}

	board[0][1].state = 1;
	board[1][2].state = 1;
	board[2][0].state = 1;
	board[2][1].state = 1;
	board[2][2].state = 1;

	return board;
}
