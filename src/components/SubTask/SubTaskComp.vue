<template>
	<li :id="`subTask${id}`" class="subTask">
		<div class="subTaskInfo">
			<input
				:id="`subTaskCheckboxInput${id}-p${parent}`"
				type="checkbox"
				name=""
				class="checkbox"
				:checked="checked"
				@click="changeState(parent)"
			/>
			<p class="description">{{ description }}</p>
		</div>
		<nav class="subTaskControls">
			<button class="deleteSubtaskButton" @click="deleteSubTask(parent)">
				<IconTrash class="trashIcon" />
			</button>
		</nav>
	</li>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'SubTaskComp',
	props: {
		id: {
			type: Number,
			required: true,
		},
		parent: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			default: 'Task short description',
		},
		checked: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		changeState(parentId: number) {
			const element = document.querySelector(
				`input#subTaskCheckboxInput${this.id}-p${this.parent}`
			) as HTMLInputElement;

			const localTasks: Task[] = sm.get('tasks');

			localTasks[parentId].subTasks[this.id].checked = element.checked;

			sm.set('tasks', localTasks);
		},
		deleteSubTask(parentId: number) {
			const localTasks: Task[] = sm.get('tasks');

			localTasks[parentId].subTasks.splice(this.id, 1);

			sm.set('tasks', localTasks);
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.subTask {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.subTaskInfo {
		display: flex;
		align-items: center;

		.checkbox {
			appearance: none;
			background-color: transparent;
			margin: 0;

			margin-right: 10px;

			.light-mode & {
				color: $blue3;
				background-color: transparent;
			}
			.dark-mode & {
				color: $dark-background;
				background-color: transparent;
			}

			width: 20px;
			height: 20px;
			border: 5px solid currentColor;
			border-radius: 50%;

			&:checked {
				background-color: $checked-color;
			}
		}

		.description {
			font-family: $secondary-font;
			margin: 1px 0;
		}
	}

	.subTaskControls {
		opacity: 0;
		@media (pointer: none), (pointer: coarse) {
			opacity: 0.5;
		}
		transition: opacity 0.2s;

		button {
			background-color: transparent;
			padding: 1px;
			border: 0;
			cursor: pointer;
		}

		.deleteSubtaskButton {
			.trashIcon * {
				transition: stroke 0.2s;
			}
			&:hover .trashIcon * {
				stroke: $begonia-red0;
			}
		}
	}
	&:hover .subTaskControls {
		transition: 1s 0.2s;
		opacity: 1;
		right: -7%;
	}
}
</style>
