<script setup lang="ts">
import { Cell, CellState, LifeBoard } from '../types';
defineProps<{ board: LifeBoard }>();
defineEmits<{
	(event: 'cellClicked', cell: Cell): void;
}>();
</script>

<template>
	<div
		class="board"
		:style="{
			gridTemplateRows: `repeat(${board.length}, 1fr)`,
			gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
		}"
	>
		<template v-for="row in board">
			<div
				@click="$emit('cellClicked', cell)"
				class="cell"
				:class="{ 'cell--alive': cell.state === CellState.Alive, 'cell--dead': cell.state === CellState.Dead }"
				v-for="cell in row"
			>
				<!-- {{ cell.position.x }} {{ cell.position.y }} -->
			</div>
		</template>
	</div>
</template>

<style scoped>
.board {
	display: grid;
	gap: 1px;
	overflow: hidden;
}

.cell {
	width: 14px;
	height: 14px;
}

.cell--dead {
	background-color: #000;
}

.cell--alive {
	background-color: lightblue;
}
</style>
