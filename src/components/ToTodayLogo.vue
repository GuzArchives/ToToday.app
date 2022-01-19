<template>
	<picture>
		<nuxt-img
			v-if="$colorMode.value != 'dark'"
			src="/images/ToToday-Dark.svg"
			alt="ToToday logo"
			width="250"
		/>
		<nuxt-img
			v-else
			src="/images/ToToday-Light.svg"
			alt="ToToday logo"
			width="250"
		/>
	</picture>
</template>
