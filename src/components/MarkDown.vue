<template>
	<article>
		<nuxt-content :document="file" :class="classes" />
	</article>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'MarkDown',
	props: {
		filePath: {
			type: String,
			required: true,
		},
		classes: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			file: {},
		};
	},
	async mounted() {
		this.file = await this.$content(this.filePath).fetch();
	},
});
</script>

<style lang="scss">
@import '~assets/styles/_variables.scss';
@import '~assets/styles/_contents.scss';

.nuxt-content p,
li {
	font-family: $secondary-font;
	font-size: small;
	text-align: left;
}
</style>
