<template>
	<div class="alignInputContainerSubTask">
		<div class="subTaskInputContainer">
			<button class="addTask" @click="addSubTask(parent)">
				<IconAdd class="addIcon" />
			</button>
			<div class="subTaskInput">
				<input
					:id="`newSubTaskInputName-parent${parent}`"
					class="subTaskNameInput"
					type="text"
					name="subTaskNameInput"
					placeholder="Sub-Task Title..."
					maxlength="50"
					@keypress.enter="addSubTask(parent)"
				/>
			</div>
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
			if (sm.get('tasks') === undefined)
				sm.add('tasks', [], `subTaskList-${parentId}`);

			const titleInput = document.querySelector(
				`input#newSubTaskInputName-parent${parentId}`
			) as HTMLInputElement;

			const newTitle = titleInput.value;

			if (!newTitle || newTitle === '') {
				if (!titleInput.className.includes(' warnTitle'))
					titleInput.className += ' warnTitle';

				(
					document.querySelector(
						`input#newSubTaskInputName-parent${parentId}`
					) as HTMLInputElement
				).className = titleInput.className;

				setTimeout(() => {
					(
						document.querySelector(
							`input#newSubTaskInputName-parent${parentId}`
						) as HTMLInputElement
					).className = titleInput.className.replace(' warnTitle', '');
				}, 1500);

				return;
			}

			const subTasks: SubTask[] = sm.get(`tasks[${parentId}].subTasks`) || [];

			subTasks.push({
				description: newTitle,
				checked: false,
			});

			sm.set(
				`tasks[${parentId}].subTasks`,
				subTasks,
				[`subTaskList-${parentId}`, 'progressNumber']
			);

			(
				document.querySelector(
					`input#newSubTaskInputName-parent${parentId}`
				) as HTMLInputElement
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
				border-radius: calc($task-border-radius/2);
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
