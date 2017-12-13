<template>
	<li>
		<div
		:class="{bold: hasChild}"
		@click="toggle">
			{{ model.name }}
			<span v-if="hasChild">[{{ open ? '-' : '+' }}]</span>
		</div>

		<tools
		:model="model"
		:open="open">
		</tools>

		<ul v-show="open" v-if="hasChild">
			<item
			class="item"
			v-for="model in model.children"
			:key="model.id"
			:model="model">
			</item>
		</ul>
	</li>
</template>

<script>

	import tools from './tools.vue'

	export default {
		name: 'item',
		components: {
			"tools": tools
		},
		props: {
			model: {}
		},
	    data: function() {
	        return {
	            open: false
	        }
	    },
	    computed: {
	        hasChild: function() {
	            return this.model.children &&
	                this.model.children.length
	        }
	    },
	    methods: {
	        toggle: function() {
	            if (this.hasChild) {
	                this.open = !this.open
	            }
	        },
	        deleteChild: function() {
	        	// 侦听子节点发出的删除事件
	        }
	    }
	}
</script>

<style>
	.bold {
		font-weight: bold;
	}
</style>