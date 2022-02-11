<template>
	<div class="footer">
		<p>
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
