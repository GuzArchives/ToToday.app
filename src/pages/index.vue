<template>
	<main class="container">
		<div>
			<ToTodayLogo />
			<p>A single page web app to help yours day-to-day tasks</p>
			<ThemePicker />
		</div>
		<PageFooter />
	</main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'IndexPage',
});
</script>
