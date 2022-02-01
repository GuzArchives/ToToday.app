<template>
	<div class="alignInputContainerSubTask">
		<div class="subTaskInputContainer">
			<button class="addTask" @click="addSubTask(parent)">
				<IconAdd class="addIcon" />
			</button>
			<form class="subTaskInput">
				<input
					id="newSubTaskInputName"
					class="subTaskNameInput"
					type="text"
					name="subTaskNameInput"
					placeholder="Sub-Task Title..."
					maxlength="50"
					@keypress.enter="addSubTask(parent)"
				/>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'SubTaskInput',
	props: {
		parent: {
			type: Number,
			required: true,
		},
	},
	methods: {
		addSubTask: (parentId: number) => {
			if (sm.get('tasks') === undefined) sm.add('tasks', []);

			const titleInput = document.querySelector(
				'input#newSubTaskInputName'
			) as HTMLInputElement;

			const newTitle = titleInput.value;

			if (!newTitle || newTitle === '') {
				if (!titleInput.className.includes(' warnTitle'))
					titleInput.className += ' warnTitle';

				(
					document.querySelector(
						'input#newSubTaskInputName'
					) as HTMLInputElement
				).className = titleInput.className;

				setTimeout(() => {
					(
						document.querySelector(
							'input#newSubTaskInputName'
						) as HTMLInputElement
					).className = titleInput.className.replace(' warnTitle', '');
				}, 1500);

				return;
			}

			const subTaskItem: SubTask = {
				description: newTitle,
				checked: false,
			};

			const localTasks: Task[] = sm.get('tasks');
			const parentTask = localTasks[parentId];

			if (!parentTask.subTasks) parentTask.subTasks = [];

			parentTask.subTasks.push(subTaskItem);
			localTasks[parentId] = parentTask;

			sm.set('tasks', localTasks);

			(
				document.querySelector('input#newSubTaskInputName') as HTMLInputElement
			).value = '';
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.alignInputContainerSubTask {
	@include center;
	justify-content: left;
	&,
	* {
		transition: all 0.2s;
	}
	*::placeholder {
		transition: all 0.2s;
	}
	.subTaskInputContainer {
		@include center;
		width: 100%;

		.addTask {
			$bg-color: #00000080;

			background-color: $bg-color;

			margin: 2px;
			margin-right: 2%;
			padding: 1px;
			border-radius: 50%;
			border: 0px;

			@include center;

			.addIcon {
				padding: 2px;
			}

			&:active {
				transform: scale(0.5);
			}

			.light-mode & * {
				stroke: $sky3;
			}

			&:hover * {
				stroke: $sky0;
			}
		}

		.subTaskInput {
			text-align: left;
			width: 100%;
			.subTaskNameInput {
				font-family: $secondary-font;
				height: 1.5em;
				width: 90%;
				border: 0;
				border-radius: 10px;
				padding: 5px 10px;

				.light-mode & {
					background-color: $blue0;
					color: $independence-gray0;
					&::placeholder {
						color: $independence-gray1;
					}
				}
				.dark-mode & {
					background-color: $eerie-black0;
					color: $dark-primary;
					&::placeholder {
						color: $dark-secondary;
					}
				}

				.warnTitle {
					&::placeholder {
						color: $unchecked-color !important;
					}
				}
			}
		}
	}
}
</style>
