<template>
	<li
		:id="`task${id}`"
		:class="`${preventAnim ? 'preventAnimLoad ' : ''}${
			newTask ? 'newTask ' : ''
		}taskContainer`"
	>
		<div class="taskControl">
			<div class="task">
				<div class="taskInfo">
					<label
						class="checkbox"
						:for="`checkboxInput${id}`"
						@click="changeState()"
					>
						<input
							:id="`checkboxInput${id}`"
							type="checkbox"
							:checked="checked"
						/>
						<div class="icons animate preventAnim">
							<IconChecked class="checkedIcon" />
							<IconUnchecked class="uncheckedIcon" />
						</div>
					</label>
					<div class="info">
						<h1>{{ title }}</h1>
						<p>{{ description }}</p>
					</div>
				</div>
				<nav class="controls">
					<button
						:class="`${
							openSubTasks ? 'openedSubtasksButton' : 'closedSubtasksButton'
						} subtasksButton`"
						@click="openSubTasks = !openSubTasks"
					>
						<IconDropdown class="dropdownIcon" />
					</button>
					<button class="deleteButton" @click="deleteTask()">
						<IconTrash class="trashIcon" />
					</button>
				</nav>
			</div>
		</div>
		<SubTaskList :parent="id" :opened="openSubTasks" />
	</li>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'TaskComp',
	props: {
		id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			default: 'Task Title',
		},
		description: {
			type: String,
			default: 'Task short description',
		},
		checked: {
			type: Boolean,
			default: false,
		},
		newTask: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			openSubTasks: false,
			preventAnim: true,
		};
	},
	mounted() {
		setTimeout(() => {
			this.preventAnim = false;
		}, 1000);
	},
	methods: {
		changeState() {
			const element = document.querySelector(
				`input#checkboxInput${this.id}`
			) as HTMLInputElement;
			const tasks: Task[] = sm.get('tasks');

			tasks[this.id].checked = element?.checked;

			this.openSubTasks = false;

			sm.set('tasks', tasks, ['taskList', 'taskState']);
		},
		deleteTask() {
			const localTasks: Task[] = sm.get('tasks');
			localTasks.splice(this.id, 1);
			sm.set('tasks', localTasks, ['taskList', 'taskState']);
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';
@import '~assets/styles/_animations.scss';

.newTask {
	animation-delay: 0s !important;
}

.taskContainer {
	@for $i from 1 through 1000 {
		&#task#{$i} {
			animation-delay: #{$i * 0.2}s;
		}
	}

	opacity: 0;
	transform: translateY(50%);

	animation: enter 0.5s forwards ease-out;

	.taskControl {
		display: flex;

		margin-top: 5%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.task {
			.light-mode & {
				background-color: $blue0;
				color: $independence-gray0;
			}
			.dark-mode & {
				background-color: $eerie-black0;
				color: $dark-primary;
			}

			position: relative;
			width: 100%;
			z-index: 4;

			border-radius: $task-border-radius;
			padding: $task-padding;

			@include center;
			justify-content: space-between;
			text-align: left;

			.taskInfo {
				display: flex;
				text-align: left;
				align-items: center;
				width: 100%;

				.checkbox {
					padding: 1%;
					padding-right: 2%;

					cursor: pointer;

					input {
						display: none;
					}
					input[type='checkbox']:checked + .icons {
						animation: iconAnim 1s;
						.checkedIcon {
							display: inline-block;
						}
						.uncheckedIcon {
							display: none;
						}

						.checkedIcon *,
						.uncheckedIcon * {
							.light-mode & {
								@include colorFadeAnim(
									$unchecked-color,
									$checked-color,
									1s,
									'checkLight'
								);
								stroke: $checked-color;
							}
							.dark-mode & {
								@include colorFadeAnim(
									$unchecked-color,
									$checked-color,
									1s,
									'checkDark'
								);
								stroke: $checked-color;
							}
						}
					}
					input[type='checkbox']:not(:checked) + .icons {
						animation: iconAnimReverse 1s;
						.checkedIcon {
							display: none;
						}
						.uncheckedIcon {
							display: inline-block;
						}

						.checkedIcon *,
						.uncheckedIcon * {
							.light-mode & {
								@include colorFadeAnim(
									$checked-color,
									$unchecked-color,
									1s,
									'uncheckLight'
								);
								stroke: $unchecked-color;
							}
							.dark-mode & {
								@include colorFadeAnim(
									$checked-color,
									$unchecked-color,
									1s,
									'uncheckDark'
								);
								stroke: $unchecked-color;
							}
						}
					}
					.icons {
						@include center;
						$bg-color: #00000080;

						background-color: $bg-color;

						margin: 2px;
						padding: 2px;
						border-radius: 50%;

						.checkedIcon *,
						.uncheckedIcon * {
							.light-mode & {
								stroke: $unchecked-color;
							}
							.dark-mode & {
								stroke: $unchecked-color;
							}
						}
					}
				}

				.info {
					display: inline-block;
					text-overflow: ellipsis;

					h1 {
						font-size: 1.2em;
						margin: 0;
					}

					p {
						font-family: $secondary-font;
						font-size: 0.8em;
						margin: 0;
						white-space: pre-wrap;
					}
				}
			}

			.controls {
				transition: opacity 0.3s;
				transition: transform 0.3s;
				@include center;

				@media (hover) and (min-width: 600px) {
					transform: translateX(30px);
				}
				@media (hover) {
					opacity: 0;
				}

				button {
					background-color: transparent;
					padding: 1px;
					margin: 0 2.5px;
					border: 0;

					cursor: pointer;
					@include center;

					&:first-of-type {
						margin-left: 0;
					}
					&:last-of-type {
						margin-right: 0;
					}

					* {
						transition: all 0.1s;
					}
					&:hover {
						* {
							.light-mode & {
								stroke: $light-primary;
							}
							.dark-mode & {
								stroke: $dark-primary;
							}
						}
					}

					&.deleteButton {
						@media (hover) and (min-width: 600px) {
							transform: translateX(10px);
						}
						&:hover {
							* {
								stroke: $unchecked-color;
							}
						}
					}
				}

				& .subtasksButton {
					&.openedSubtasksButton {
						transform: rotate(180deg);
					}
					&.closedSubtasksButton {
						transform: rotate(0deg);
					}
				}
			}
		}
	}

	&:hover .taskControl .task .controls {
		transition: opacity 0.3s;
		opacity: 1;
	}
}
</style>
