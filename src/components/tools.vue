<template>
	<span class="tools">
		<span
		class="el-icon el-icon-circle-plus-outline"
		key="add-child"
		v-if="isFolder || !(isNotRoot)"
		@click="addChildBox"></span>
		<span
		class="el-icon el-icon-edit"
		key="modify-node"
		@click="modifyNode"></span>
		<span
		class="el-icon el-icon-delete"
		key="delete-node"
		@click="deleteNodeBox"
		v-if="isNotRoot"></span>
	</span>
</template>

<script>
	import eventBus from '../utils/eventBus.js'

	export default {
		props: {
			model: {}
		},
		computed: {
			isNotRoot: function() {
				return this.model.id !== '0'
			},
			hasChild: function() {
	            return this.model.children &&
	                this.model.children.length
	        },
	        isFolder: function() {
	        	return this.model.fileType === 'folder'
	        }
		},
		methods: {
			deleteNodeBox: function() { // 弹出框再次确认
				// 触发删除事件到事件总线
				// id用于搜索删除项，name用于弹出框展示
				eventBus.$emit('deleteNodeBox', this.model.name, this.model.id)
			},
			addChildBox: function() {
				// 这里必须先判断有没有子节点
				if (!this.model.children) {
					Vue.set(this.model, 'children', [])
				}

				eventBus.$emit('addChildBox', this.model.name, this.model.id, this.model.children)
			},
			modifyNode: function() {
				eventBus.$emit('modifyNodeBox', this.model)
			}
		}
	}
</script>

<style>
	/* 后期需考虑浏览器前缀问题 */

	.tools {
		float: right;
	}
	.el-icon {
		margin: 0 10px;
		cursor: pointer;
	}
	.el-icon:hover {
		transform: scale(1.2);
	}
	.el-icon:active {
		transform: scale(1.2) translateY(1px);
	}
</style>
