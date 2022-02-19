<template>
	<div :class="`${preventAnim ? 'preventAnimLoad ' : ''}_page`">
		<main class="main">
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
		<PopUp v-if="newUpdate">
			<MarkDown file-path="changeLog" classes="changeLogContent" />
		</PopUp>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';
import date from '~/libs/date';
import appInfo from '~~/package.json';

export default Vue.extend({
	name: 'IndexPage',
	data() {
		return {
			preventAnim: true,
			newUpdate: false,
		};
	},
	mounted() {
		const data: MetaInfo['lastOpen'] | undefined = sm.get('!lastOpen');

		const appVersion = appInfo.version.split('.').map(Number);
		const lastVersion = data?.version.split('.').map(Number) || [0, 0, 0];

		if (!data) {
			this.newUpdate = true;
		} else if (
			appVersion[0] > lastVersion[0] ||
			appVersion[1] > lastVersion[1]
		) {
			setTimeout(() => {
				this.newUpdate = true;
			}, 500);
		}

		sm.set(
			'!lastOpen',
			{
				version: appInfo.version,
				date: date.full(),
			},
			'meta'
		);

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
