<template>
	<div class="footer">
		<p>
			Version: {{ version }} {{ storage_updated }}
			<br />
			<a href="http://github.com/ProjectLored/ToToday.app" target="_blank">
				(c) 2022 Lored &bull; MIT License
			</a>
			<br />
			Icons provided by
			<a href="https://iconoir.com/" target="_blank"> Iconoir </a>
		</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import appInfo from '~~/package.json';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'PageFooter',
	data() {
		return {
			version: appInfo.version,
			storage_updated: sm.get('date.updated', true)
				? `- Storage Updated: ${sm.get('date.updated', true).day.readable} ${
						sm.get('date.updated', true).hour.readable
				  }`
				: '',
		};
	},
	mounted() {
		window.addEventListener('localStorage-changed', () => {
			this.storage_updated = sm.get('date.updated', true)
				? `- Storage Updated: ${sm.get('date.updated', true).day.readable} ${
						sm.get('date.updated', true).hour.readable
				  }`
				: '';
		});
	},
});
</script>

<style scoped lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.footer {
	@include link;

	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	font-family: $secondary-font;
	font-size: small;

	.light-mode & {
		color: $light-secondary;
	}

	.dark-mode & {
		color: $dark-secondary;
	}
}
</style>
