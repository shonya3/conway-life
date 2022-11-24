export enum CellState {
	Dead = 0,
	Alive = 1,
}
export type LifeBoard = Cell[][];
export type CellPosition = { x: number; y: number };
export interface Cell {
	state: CellState;
	position: CellPosition;
}
