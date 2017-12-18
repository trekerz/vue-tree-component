<template>
	<li>
		<div>
			<span>
				<span
				class="el-icon-caret-right"
				:class="{'rotate-down': open, 'rotate-back': !open}"
				v-if="isFolder"
				@click="toggle"></span>

				<span
				:class="[{'model-name': true}, {bold: isFolder}]"
				@click="toggle">
					{{ model.name }}
				</span>
			</span>

			<transition name="fade-in">
				<tools
				:model="model">
				</tools>
			</transition>
		</div>

		<transition name="slide-from-left">
			<ul v-show="open" v-if="hasChild">
				<item
				class="item"
				v-for="childModel in model.children"
				:key="childModel.id"
				:model="childModel">
				</item>
			</ul>
		</transition>
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
	            open: false,
	            modelFocus: false
	        }
	    },
	    computed: {
	        hasChild: function() {
	            return this.model.children &&
	                this.model.children.length
	        },
	        isFolder: function() {
	        	return this.model.fileType === 'folder'
	        }
	    },
	    methods: {
	        toggle: function() {
	            this.open = !this.open
	        }
	    }
	}
</script>

<style>
	/* 后期需考虑浏览器前缀问题 */

	.bold {
		font-weight: bold;
	}
	.el-icon-caret-right {
		color: #aaa;
	}
	.el-icon-caret-right,
	.model-name {
		cursor: pointer;
	}
	.rotate-down {
		transform-origin: center center;
		transform: rotate(90deg);
		transition: transform .2s;
	}
	.rotate-back {
		transform-origin: center center;
		transition: transform .2s;
	}
	.slide-from-left-enter-active {
		transition: all .3s ease;
	}
	.slide-from-left-enter {
		margin-left: -20px;
		opacity: 0;
	}
	.fade-in-enter-active {
		transition: all .5s ease;
	}
	.fade-in-enter {
		opacity: 0;
	}
</style>
