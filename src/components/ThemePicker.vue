<template>
	<div class="themePicker">
		<button
			@click="
				$colorMode.preference =
					$colorMode.preference === 'dark' ? 'light' : 'dark';
				updateThemeInfo($colorMode.preference);
			"
		>
			<IconMoon class="light-mode-element" />
			<IconSun class="dark-mode-element" />
		</button>
	</div>
</template>

<script>
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	methods: {
		updateThemeInfo: (theme) => sm.set('theme', theme, 'meta', false, true),
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

.themePicker {
	z-index: 100;
	position: fixed;

	transition: right, bottom 1s ease-in-out;
	right: 10px;
	bottom: 10px;
	@media screen and (min-width: 600px) {
		right: 40px;
		bottom: 40px;
	}

	font-family: $secondary-font;
	font-size: 15px;

	button {
		* {
			width: 25px;
			height: 25px;
			@include center;
			margin: 3px 0px;
			padding: 0;
		}

		background-color: transparent;
		font-size: 15px;
		outline: 0;
		font-family: $secondary-font;

		border-width: 2px;
		border-style: solid;
		border-radius: 25%;
		transition: border-color 0.2s;
		.icon * {
			transition: stroke 0.2s;
		}

		.light-mode & {
			border-color: $light-secondary;
			.icon * {
				stroke: $light-secondary;
			}

			&:focus,
			&:hover {
				.icon * {
					stroke: $light-primary;
				}
				border-color: $light-primary;
			}
		}
		.dark-mode & {
			border-color: $dark-secondary;
			.icon * {
				stroke: $dark-secondary;
			}

			&:focus,
			&:hover {
				border-color: $dark-primary;
				.icon * {
					stroke: $dark-primary;
				}
			}
		}
	}
}
</style>
