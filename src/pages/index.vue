<template>
	<main :class="`${preventAnim ? 'preventAnimLoad ' : ''}container`">
		<div>
			<ToTodayLogo />
			<p>A single page web app to help yours day-to-day tasks</p>
			<ThemePicker />
		</div>
		<div>
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
