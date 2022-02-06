<template>
	<main :class="`${preventAnim ? 'preventAnimLoad ' : ''}main`">
		<div>
			<ToTodayLogo />
			<p>A single page web app to help yours day-to-day tasks</p>
			<ThemePicker />
		</div>
		<div class="tasks">
			<TaskList />
		</div>
		<PageFooter />
	</main>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'IndexPage',
	data() {
		return {
			preventAnim: true,
		};
	},
	mounted() {
		setTimeout(() => {
			this.preventAnim = false;
		}, 1000);
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.main {
	.tasks {
		@include center;
	}
}
</style>
