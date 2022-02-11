<template>
	<div class="progressBar">
		<div class="barContainer">
			<div class="bar">
				<div
					class="progress"
					:style="`width: ${progress - 4 <= 0 ? 0 : progress - 4}%`"
				></div>
			</div>
		</div>
		<p class="progressInfo">{{ Math.round(progress) }}%</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'ProgressBar',
	data() {
		return {
			progress: 0,
		};
	},
	created() {
		this.progress = this.getProgress().percentage;
	},
	mounted() {
		window.addEventListener('storageUpdated-taskState', () => {
			this.progress = this.getProgress().percentage;
		});
		window.addEventListener('storageUpdated-subTaskState', () => {
			this.progress = this.getProgress().percentage;
		});
	},
	methods: {
		getProgress() {
			const tasks: Task[] = sm.get('tasks');

			const totalTasks =
				tasks.length +
				tasks
					.map((task) => task.subTasks)
					.map((st) => st.length)
					.reduce((a, b) => a + b, 0);

			const checkedTasks =
				tasks.filter((t) => t.checked).length +
				tasks
					.map((task) => task.subTasks)
					.flat()
					.filter((sb) => sb.checked).length;

			return {
				total: totalTasks,
				checked: checkedTasks,
				percentage: isNaN((100 * checkedTasks) / totalTasks)
					? 0
					: (100 * checkedTasks) / totalTasks,
			};
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';
@import '~assets/styles/_animations.scss';

.progressBar {
	opacity: 0;
	transform: translateY(50%);

	animation: enter 0.3s forwards ease-out;
	animation-delay: 1.5s;

	.progressInfo {
		margin-top: 0;
		.light-mode & {
			color: $light-secondary;
		}
		.dark-mode & {
			color: $dark-secondary;
		}
	}

	.barContainer {
		width: 100%;

		@include center;

		.bar {
			$bar-height: 15px;

			@include center;
			justify-content: left;

			.light-mode & {
				background-color: $blue2;
			}
			.dark-mode & {
				background-color: $eerie-black0;
			}

			width: 60%;
			height: $bar-height;
			border-radius: $bar-height;

			.progress {
				transition: width 0.5s;

				background-color: $checked-color;
				border-radius: $bar-height;
				height: 49%;
				// width: 100%-4%;
				margin-left: 2%;
			}
		}
	}
}
</style>
