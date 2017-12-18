<template>
	<div
	class="ul-wrapper">
		<ul>
			<item
			class="item"
			:model="treeData">
			</item>
		</ul>	
	</div>
</template>

<script>
	import item from './item.vue'

	export default {
		name: 'tree',
		components: {
			"item": item
		},
		props: {
			treeData: {}
		}
	}
</script>

<style>
	ul {
		line-height: 1.4em;
		list-style-type: none;
		/*border: 1px solid #000;*/
	}
	li {
		margin: 10px 0;
	}
</style>
