<template>
	<main class="container">
		<div>
			<ToTodayLogo />
			<p>A single page web app to help yours day-to-day tasks</p>
			<ThemePicker />
			<button @click="addItem()">Add storage</button>
			<button @click="setItem()">Set storage</button>
			<button @click="resetStorage()">Reset</button>
			<button @click="invalidate()">Invalidate</button>
		</div>
		<PageFooter />
	</main>
</template>

<script lang="ts">
import Vue from 'vue';
import sm from '~/libs/storageManagement';

export default Vue.extend({
	name: 'IndexPage',
	methods:{
		addItem: () => { sm.add('test1', 3); },
		setItem: () => { sm.set('test1', sm.get().test1+1); },
		resetStorage: () => { sm.createJSON(true) },
		invalidate: () => { localStorage.setItem('ToToday-storage', '{"aaa": "aaa"}') },
	}
});
</script>
