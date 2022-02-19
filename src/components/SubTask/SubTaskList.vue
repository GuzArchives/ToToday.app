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
			<SubTaskInput :parent="parent" />
		</div>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

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
			subTaskList: sm.get(`tasks[${this.parent}].subTasks`) || [],
			preventAnim: true,
		};
	},
	mounted() {
		window.addEventListener(`storageUpdated-subTaskList-${this.parent}`, () => {
			this.subTaskList = sm.get(`tasks[${this.parent}].subTasks`) || [];
		});
		setTimeout(() => {
			this.preventAnim = false;
		}, 1000);
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';
@import '~assets/styles/_animations.scss';

.opened {
	transform: translateY(-80px) scaleY(0.1);
	animation: open 0.5s forwards;
}

.closed {
	transform: translateY(-20px) scaleY(1);
	animation: close 0.5s forwards;
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

	border-radius: 0 0 $task-border-radius $task-border-radius;

	text-align: left;

	.list {
		padding: 1% 0;
		list-style: none;
	}
}
</style>
