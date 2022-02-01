<template>
	<div>
		<ul class="taskList">
			<TaskComp
				v-for="task in list"
				:id="list.indexOf(task)"
				:key="`task-comp-${list.indexOf(task)}`"
				:new-task="task.newTask"
				:title="task.title"
				:description="task.description"
				:checked="task.checked"
			/>
		</ul>
		<ProgressBar />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	data() {
		return {
			list: sm.get('tasks') ? sm.get('tasks') : [],
		};
	},
	beforeCreate() {
		if (sm.get('tasks') === undefined) sm.add('tasks', []);

		const localTasks: Task[] = sm.get('tasks');

		for (const task of localTasks) task.newTask = false;

		sm.set('tasks', localTasks);
	},
	mounted() {
		window.addEventListener('localStorage-changed', () => {
			this.list = sm.get('tasks') ? sm.get('tasks') : [];
		});
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.taskList {
	list-style: none;
	padding: 0;
}
</style>
