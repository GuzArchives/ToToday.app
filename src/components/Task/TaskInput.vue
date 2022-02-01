<template>
	<div class="alignInputContainer">
		<div class="taskInputContainer">
			<button class="addTask" @click="addTask()">
				<IconAdd class="addIcon" />
			</button>
			<form class="taskInputs">
				<div class="taskNameInputContainer">
					<input
						id="newTaskInputName"
						class="taskNameInput"
						type="text"
						name="TaskNameInput"
						placeholder="Task Title..."
						maxlength="28"
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
			</form>
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
			if (sm.get('tasks') === undefined) sm.add('tasks', []);

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

			const taskItem: Task = {
				title: newTitle,
				description: newDescription || '',
				checked: false,
				newTask: true,
				autoCheck: true,
				subTasks: [],
			};

			const localTasks: Task[] = sm.get('tasks');

			localTasks.push(taskItem);

			sm.set('tasks', localTasks);

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

.alignInputContainer {
	@include center;
	@media not screen and (pointer: none), (pointer: coarse) {
		&:not(:hover),
		.taskInputContainer *:not(:focus-within) {
			.taskInputContainer {
				animation: shrink 0.5s forwards;
				@keyframes shrink {
					from {
						padding: 5px 10px;
						margin: 10px 0;
						transform: scale(100%);
						width: 100%;
					}
					to {
						padding: 0px 25%;
						margin: 0px 0;
						transform: scale(60%);
						width: 0%;
					}
				}
				.taskInputs {
					animation: hideInputs 0.5s forwards;
					@keyframes hideInputs {
						from {
							transform: translateX(0%);
							opacity: 1;
							width: 100%;
						}
						to {
							transform: translateX(25%);
							opacity: 0;
							width: 0%;
						}
					}
				}
			}
		}

		&:hover {
			.taskInputContainer {
				animation: expand 0.5s forwards;
				@keyframes expand {
					from {
						padding: 0px 25%;
						margin: 0px 0;
						transform: scale(60%);
						width: 0%;
					}
					to {
						padding: 5px 10px;
						margin: 10px 0;
						transform: scale(100%);
						width: 100%;
					}
				}
				.taskInputs {
					animation: showInputs 0.5s forwards;
					@keyframes showInputs {
						from {
							transform: translateX(25%);
							opacity: 0;
							width: 0%;
						}
						to {
							transform: translateX(0%);
							opacity: 1;
							width: 100%;
						}
					}
				}
			}
		}
	}
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

		border-radius: 20px;
		@include center;

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

			.taskNameInputContainer,
			.taskDescriptionInputContainer {
				width: 100%;

				input,
				textarea {
					width: 90%;
					border: 0;
					border-radius: 10px;

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
