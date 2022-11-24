<script setup lang="ts">
import Board from './components/Board.vue';

import { Cell } from './types';
import { ref } from 'vue';
import { presetBoard } from './preset';
import { calcNextStep } from './lib';

// const board = ref(initBoard(60));
const board = ref(presetBoard);

const nextStep = () => {
	board.value = calcNextStep(board.value);
};

const onCellClicked = (cell: Cell) => {
	cell.state = Number(!cell.state);
	console.log(board.value);
};

const steps = ref(0);
let interval = 0;
const isIntervalSet = ref(false);
const int = () => {
	if (isIntervalSet.value) return;
	interval = setInterval(() => {
		++steps.value;
		isIntervalSet.value = true;
		nextStep();
	}, 150);
};

const stopInterval = () => {
	clearInterval(interval);
	isIntervalSet.value = false;
};
</script>

<template>
	<button @click="nextStep">Step</button>
	<button @click="int">Start</button>
	<button @click="stopInterval">Pause</button>
	steps: {{ steps }}
	<Board @cell-clicked="onCellClicked" :board="board" />
</template>

<style scoped></style>
