<template>
	<span :class="`${preventAnim ? 'preventAnimLoad ' : ''}`">
		<div :class="`${opened ? 'opened' : 'closed'} subTasks preventAnim`">
			<ul :id="`subTaskList${parent}`" class="list">
				<SubTaskComp
					v-for="subTask in subTaskList"
					:id="subTaskList.indexOf(subTask)"
					:key="`subtask-comp-${subTaskList.indexOf(subTask)}`"
					:parent="parent"
					:description="subTask.description"
					:checked="subTask.checked"
				/>
			</ul>
			<button @click="addSubTask(parent)">Add subtask</button>
		</div>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

const subTaskItem = {
	description: 'Task',
	checked: false,
};

export default Vue.extend({
	name: 'SubTasks',
	props: {
		parent: {
			type: Number,
			required: true,
		},
		opened: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			subTaskList: sm.get('tasks')[this.parent].subTasks
				? sm.get('tasks')[this.parent].subTasks
				: [],
			preventAnim: true,
		};
	},
	mounted() {
		window.addEventListener('localStorage-changed', () => {
			this.subTaskList = sm.get('tasks')[this.parent].subTasks
				? sm.get('tasks')[this.parent].subTasks
				: [];
		});
		setTimeout(() => {
			this.preventAnim = false;
		}, 1000);
	},
	methods: {
		addSubTask: (parentId: number) => {
			if (sm.get('tasks') === undefined) sm.add('tasks', []);

			const localTasks: any[] = sm.get('tasks');
			const parentTask = localTasks[parentId];

			if (!parentTask.subTasks) parentTask.subTasks = [];

			subTaskItem.description = `Description sub task ${parentTask.subTasks.length}`;

			parentTask.subTasks.push(subTaskItem);
			localTasks[parentId] = parentTask;

			sm.set('tasks', localTasks);
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.opened {
	transform: translateY(-80px) scaleY(0.1);
	animation: open 0.5s forwards;
	@keyframes open {
		from {
			transform: translateY(-80px) scaleY(0.1);
			opacity: 0;
			position: absolute;
		}
		to {
			transform: translateY(-20px) scaleY(1);
			opacity: 1;
			position: relative;
		}
	}
}

.closed {
	transform: translateY(-20px) scaleY(1);
	animation: close 0.5s forwards;
	@keyframes close {
		from {
			transform: translateY(-20px) scaleY(1);
			opacity: 1;
			position: relative;
		}
		to {
			transform: translateY(-80px) scaleY(0.1);
			display: none;
			opacity: 0;
			position: absolute;
		}
	}
}

.subTasks {
	.light-mode & {
		background-color: $blue2;
		color: $independence-gray0;
	}
	.dark-mode & {
		background-color: $eerie-black2;
		color: $dark-primary;
	}

	font-family: $secondary-font;

	width: 90%;
	z-index: 2;

	padding: 20px 5% 10px 5%;

	border-radius: 0 0 20px 20px;

	text-align: left;

	.list {
		padding: 1% 0;
		list-style: none;
	}
}
</style>
