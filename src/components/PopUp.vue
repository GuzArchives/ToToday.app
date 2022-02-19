<template>
	<div v-if="!hide" :class="`popUp${opened ? ' popUpOpen' : ' popUpClose'}`">
		<div class="popUpContent">
			<div class="popUpControls">
				<button class="popUpCloseButton" @click="close">
					<IconCancel class="popUpCloseIcon" />
				</button>
			</div>
			<slot></slot>
		</div>
		<span class="popUpBackground" @click="close"></span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'PopUp',
	data() {
		return {
			opened: true,
			hide: false,
		};
	},
	methods: {
		close() {
			this.opened = false;
			setTimeout(() => {
				this.hide = true;
			}, 500);
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';
@import '~assets/styles/_animations.scss';

.popUpOpen {
	opacity: 1 !important;
	.content {
		animation: enter 0.2s forwards ease-out;
	}
}

.popUpClose {
	opacity: 0;
	.content {
		animation: leave 0.2s forwards ease-out;
	}
}

.popUp {
	z-index: 102;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	height: 100vh;
	widows: 100vw;

	transition: opacity 0.3s;

	@include center;

	.popUpBackground {
		z-index: 101;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #00000066;
	}

	.popUpControls {
		width: 100%;
		height: 0;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		.popUpCloseButton {
			padding: 0;
			margin: 0;
			border: 0;

			background-color: transparent;

			cursor: pointer;

			.popUpCloseIcon {
				* {
					transition: stroke 0.3s;
					.light-mode & {
						stroke: $light-secondary;
					}
					.dark-mode & {
						stroke: $dark-secondary;
					}
				}
			}
			&:hover .popUpCloseIcon {
				.light-mode & * {
					stroke: $light-primary;
				}
			}
			&:hover .popUpCloseIcon {
				.dark-mode & * {
					stroke: $dark-primary;
				}
			}
		}
	}

	.popUpContent {
		transition: all 0.2s ease-out;

		@media screen and (min-width: 700px) {
			max-width: 700px;
		}

		z-index: 103;
		padding: $task-padding;
		border-radius: $task-border-radius;

		.light-mode & {
			background-color: $light-background;
		}
		.dark-mode & {
			background-color: $dark-background;
		}
	}
}
</style>
