<template>
	<div class="alignInputContainer">
		<div class="taskInputContainer">
			<button class="addTask" @click="addTask()">
				<IconAdd class="addIcon" />
			</button>
			<div class="taskInputs">
				<div class="taskNameInputContainer">
					<input
						id="newTaskInputName"
						class="taskNameInput"
						type="text"
						name="TaskNameInput"
						placeholder="Task Title..."
						maxlength="25"
						@keypress.enter="addTask()"
					/>
				</div>
				<div class="taskDescriptionInputContainer">
					<textarea
						id="newTaskInputDescription"
						class="taskDescriptionInput"
						name="TaskDescriptionInput"
						placeholder="Task Description..."
						maxlength="150"
					></textarea>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'TaskInput',
	methods: {
		addTask: () => {
			if (sm.get('tasks') === undefined) sm.add('tasks', [], 'taskList');

			const titleInput = document.querySelector(
				'input#newTaskInputName'
			) as HTMLInputElement;

			const newTitle = titleInput.value;

			const newDescription = (
				document.querySelector(
					'textarea#newTaskInputDescription'
				) as HTMLTextAreaElement
			).value;

			if (!newTitle || newTitle === '') {
				if (!titleInput.className.includes(' warnTitle'))
					titleInput.className += ' warnTitle';

				(
					document.querySelector('input#newTaskInputName') as HTMLInputElement
				).className = titleInput.className;

				setTimeout(() => {
					(
						document.querySelector('input#newTaskInputName') as HTMLInputElement
					).className = titleInput.className.replace(' warnTitle', '');
				}, 1500);

				return;
			}

			const localTasks: Task[] = sm.get('tasks');

			localTasks.push({
				title: newTitle,
				description: newDescription || '',
				checked: false,
				newTask: true,
				autoCheck: true,
				subTasks: [],
			});

			sm.set('tasks', localTasks, ['taskList', 'progressNumber']);

			(
				document.querySelector('input#newTaskInputName') as HTMLInputElement
			).value = '';

			(
				document.querySelector(
					'textarea#newTaskInputDescription'
				) as HTMLInputElement
			).value = '';
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';
@import '~assets/styles/_animations.scss';

.alignInputContainer {
	@include center;

	opacity: 0;
	transform: translateY(50%);

	animation: enter 0.5s forwards ease-out;
	animation-delay: 1s;

	.taskInputContainer {
		&,
		* {
			transition: all 0.2s;
		}
		*::placeholder {
			transition: all 0.2s;
		}

		.light-mode & {
			background-color: $blue0;
			color: $independence-gray0;
		}
		.dark-mode & {
			background-color: $eerie-black0;
			color: $dark-primary;
		}

		padding: $task-padding;
		margin: 10px 0;
		transform: scale(100%);
		width: 100%;

		border-radius: 20px;
		@include center;
		justify-content: left;

		@media (pointer: none), (pointer: coarse) {
			padding: 5px 10px;
			margin: 10px 0;
			width: 100%;
		}

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

		.taskInputs {
			text-align: left;
			width: 100%;

			.taskNameInputContainer,
			.taskDescriptionInputContainer {
				width: 100%;

				input,
				textarea {
					width: 90%;
					border: 0;
					border-radius: calc($task-border-radius/2);

					text-overflow: ellipsis;

					.light-mode & {
						color: $independence-gray0;
						&::placeholder {
							color: $independence-gray1;
						}
					}
					.dark-mode & {
						color: $dark-primary;
						&::placeholder {
							color: $dark-secondary;
						}
					}

					background-color: transparent;

					&:hover,
					&:focus {
						padding: 5px 10px;
						.light-mode & {
							background-color: $blue2;
							&::placeholder {
								color: $independence-gray0;
							}
						}
						.dark-mode & {
							background-color: $dark-background;
							&::placeholder {
								color: $dark-primary;
							}
						}
					}
				}
			}

			.taskNameInputContainer {
				.taskNameInput {
					font-family: $main-font;
					font-size: 1.2em;
				}
				& .taskNameInput:focus,
				& .taskNameInput:hover {
					margin-bottom: 10px;
				}
				.warnTitle {
					&::placeholder {
						color: $unchecked-color !important;
					}
				}
			}

			.taskDescriptionInputContainer {
				.taskDescriptionInput {
					overflow: auto;

					white-space: pre-wrap;

					font-family: $secondary-font;
					font-size: 0.85em;

					&:focus {
						height: 5em;
						resize: vertical;
					}

					&:not(:focus) {
						overflow: hidden;
						height: 1em !important;
						resize: none;
					}
				}
				& .taskDescriptionInput:focus,
				& .taskDescriptionInput:hover {
					margin-top: 10px;
				}
			}
		}
	}
}
</style>
