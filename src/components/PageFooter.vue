<template>
	<div class="footer">
		<p>
			<span class="debugInfo">
				Version: {{ version }} - Updated: {{ storage_updated }} -
				{{ storage_size }}
				<br />
			</span>
			(c) 2022
			<a
				href="https://github.com/LoredDev"
				target="_blank"
				rel="noreferrer"
				itemtype="https://schema.org/brand"
			>
				Lored
			</a>
			&bull;
			<a
				href="https://github.com/LoredDev/ToToday.app/blob/dev/LICENSE"
				target="_blank"
				rel="noreferrer"
				itemtype="https://schema.org/license"
			>
				MIT License
			</a>
			&bull; Icons provided by
			<a href="https://iconoir.com/" target="_blank"> Iconoir</a>
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
				? `${sm.get('date.updated', true).day.readable} ${
						sm.get('date.updated', true).hour.readable
				  }`
				: '',
			storage_size: `${sm.getSize().toFixed(2)}Kb`,
		};
	},
	mounted() {
		window.addEventListener('localStorage-changed', () => {
			this.storage_updated = sm.get('date.updated', true)
				? `${sm.get('date.updated', true).day.readable} ${
						sm.get('date.updated', true).hour.readable
				  }`
				: '';
			this.storage_size = `${sm.getSize().toFixed(2)}Kb`;
		});
	},
});
</script>

<style scoped lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.footer {
	@include link;

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

	.debugInfo {
		font-size: 0.8em;
	}
}
</style>
