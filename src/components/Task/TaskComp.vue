<template>
	<li
		:id="`task${id}`"
		:class="`${preventAnim ? 'preventAnimLoad ' : ''}${
			newTask ? 'newTask ' : ''
		}taskContainer`"
	>
		<div class="taskControl">
			<div :class="`task`">
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
				<button
					:class="`${
						openSubTasks ? 'openedSubtasksButton' : 'closedSubtasksButton'
					} subtasksButton`"
					@click="openSubTasks = !openSubTasks"
				>
					<IconDropdown class="dropdownIcon" />
				</button>
			</div>
			<nav class="controls">
				<button class="deleteButton" @click="deleteTask()">
					<IconTrash class="trashIcon" />
				</button>
			</nav>
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

			sm.set('tasks', tasks);
		},
		deleteTask() {
			const localTasks: Task[] = sm.get('tasks');
			localTasks.splice(this.id, 1);
			sm.set('tasks', localTasks);
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.newTask {
	animation-delay: 0s !important;
}

.taskContainer {
	@for $i from 1 through 100 {
		&#task#{$i} {
			animation-delay: #{$i * 0.2}s;
		}
	}

	opacity: 0;
	transform: translateY(50%);

	animation: enter 0.5s ease-out;
	animation-fill-mode: forwards;

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(50%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.taskControl {
		display: flex;

		margin-top: 5%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.controls {
			position: absolute;
			right: -6%;

			opacity: 0;
			@media (pointer: none), (pointer: coarse) {
				opacity: 0.5;
			}
			transition: opacity 0.2s;
			transition: right 0.3s;

			button {
				background-color: transparent;
				padding: 1px;
				border: 0;
				cursor: pointer;
			}

			.deleteButton {
				.trashIcon * {
					transition: stroke 0.2s;
				}
				&:hover .trashIcon * {
					stroke: $begonia-red0;
				}
			}
		}
		&:hover .controls {
			transition: 0.2s 0.5s;
			opacity: 1;
			right: -7%;
		}

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

			border-radius: 20px;
			padding: 10px;

			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 5%;

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

					@keyframes iconAnim {
						from {
							transform: rotate(0) scale(1);
						}
						5% {
							transform: rotate(0) scale(0.7);
						}
						50% {
							transform: rotate(360deg) scale(1.2);
						}
						90% {
							transform: scale(1.2);
						}
						to {
							transform: scale(1);
						}
					}

					@keyframes iconAnimReverse {
						from {
							transform: rotate(0) scale(1);
						}
						5% {
							transform: rotate(0) scale(0.7);
						}
						50% {
							transform: rotate(-360deg) scale(1);
						}
						to {
							transform: rotate(-360deg) scale(1);
						}
					}
				}

				.info {
					display: inline-block;

					h1 {
						font-size: 1.2em;
						margin: 0;
					}

					p {
						font-family: $secondary-font;
						font-size: 0.8em;
						margin: 0;
					}
				}
			}

			.subtasksButton {
				display: flex;
				align-items: center;

				opacity: 0;
				@media (pointer: none), (pointer: coarse) {
					opacity: 0.5;
				}
				transition: opacity 0.2s;

				background-color: transparent;
				padding: 1px;
				border: 0;
				cursor: pointer;

				.dropdownIcon {
					* {
						transition: stroke 0.2s;
					}
					&:hover * {
						.light-mode & {
							stroke: $independence-gray0;
						}
						.dark-mode & {
							stroke: $dark-primary;
						}
					}
				}

				&.openedSubtasksButton {
					.dropdownIcon {
						transform: rotate(180deg);
					}
				}
				&.closedSubtasksButton {
					.dropdownIcon {
						transform: rotate(0deg);
					}
				}
			}
			&:hover .subtasksButton {
				opacity: 1;
			}
		}
	}
}
</style>
