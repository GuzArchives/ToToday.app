<template>
	<li :id="id" class="task">
		<label class="checkbox" :for="`checkboxInput${id}`">
			<input :id="`checkboxInput${id}`" type="checkbox" />
			<div class="icons animate">
				<IconChecked class="checkedIcon" />
				<IconUnchecked class="uncheckedIcon" />
			</div>
		</label>
		<div class="info">
			<h1>{{ title }}</h1>
			<p>{{ description }}</p>
		</div>
	</li>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'TaskComp',
	props: {
		id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			default: 'Task Title',
		},
		description: {
			type: String,
			default: 'Task short description',
		},
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_mixins.scss';

$checked-color: $green0;
$unchecked-color: $begonia-red0;

.task {
	.light-mode & {
		background-color: $blue0;
		color: $independence-gray0;
	}
	.dark-mode & {
		background-color: $eerie-black0;
		color: $dark-primary;
	}

	display: flex;
	text-align: left;
	align-items: center;

	border-radius: 20px;
	margin-top: 5%;
	padding: 10px;

	.checkbox {
		padding: 1%;
		padding-right: 2%;

		input {
			display: none;
		}
		input[type='checkbox']:checked + .icons {
			animation: iconAnim 1s;
			.checkedIcon {
				display: inline-block;
			}
			.uncheckedIcon {
				display: none;
			}

			.checkedIcon *,
			.uncheckedIcon * {
				.light-mode & {
					@include colorFadeAnim(
						$unchecked-color,
						$checked-color,
						1s,
						'checkLight'
					);
					stroke: $checked-color;
				}
				.dark-mode & {
					@include colorFadeAnim(
						$unchecked-color,
						$checked-color,
						1s,
						'checkDark'
					);
					stroke: $checked-color;
				}
			}
		}
		input[type='checkbox']:not(:checked) + .icons {
			animation: iconAnimReverse 1s;
			.checkedIcon {
				display: none;
			}
			.uncheckedIcon {
				display: inline-block;
			}

			.checkedIcon *,
			.uncheckedIcon * {
				.light-mode & {
					@include colorFadeAnim(
						$checked-color,
						$unchecked-color,
						1s,
						'uncheckLight'
					);
					stroke: $unchecked-color;
				}
				.dark-mode & {
					@include colorFadeAnim(
						$checked-color,
						$unchecked-color,
						1s,
						'uncheckDark'
					);
					stroke: $unchecked-color;
				}
			}
		}
		.icons {
			@include center;
			$bg-color: #00000080;

			background-color: $bg-color;

			margin: 2px;
			padding: 2px;
			border-radius: 50%;

			.checkedIcon *,
			.uncheckedIcon * {
				.light-mode & {
					stroke: $unchecked-color;
				}
				.dark-mode & {
					stroke: $unchecked-color;
				}
			}
		}

		@keyframes iconAnim {
			from {
				transform: rotate(0) scale(1);
			}
			5% {
				transform: rotate(0) scale(0.7);
			}
			50% {
				transform: rotate(360deg) scale(1.2);
			}
			90% {
				transform: scale(1.2);
			}
			to {
				transform: scale(1);
			}
		}

		@keyframes iconAnimReverse {
			from {
				transform: rotate(0) scale(1);
			}
			5% {
				transform: rotate(0) scale(0.7);
			}
			50% {
				transform: rotate(-360deg) scale(1);
			}
			to {
				transform: rotate(-360deg) scale(1);
			}
		}
	}

	.info {
		display: inline-block;

		h1 {
			font-size: 1.2em;
			margin: 0;
		}

		p {
			font-family: $secondary-font;
			font-size: 0.8em;
			margin: 0;
		}
	}
}
</style>
