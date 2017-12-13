<template>
	<span>
		<span class="addChild" @click="addChild">(A)</span>
		<span class="modifyNode" @click="modifyNode">(M)</span>
		<span class="deleteNode" @click="deleteNode">(D)</span>
	</span>
</template>

<script>
	import eventBus from '../eventBus.js'
	
	export default {
		props: {
			model: {}
		},
		methods: {
			addChild: function() {
	        	// 如果当前节点没有子节点，则创建之
				if (!this.model.children) {
					this.$set(this.model, 'children', [])
				}

				var children = this.model.children,
					id = '';

				// 判断是否为一级节点
				if (this.model.id === '0') {
					id = (children.length + 1).toString()
				} else {
					id = this.model.id + '-' + (children.length + 1).toString()
				}

				children.push({
					name: 'new staff',
					id: id
				})
	        },
			deleteNode: function() { // 这里可能需要弹出框再次确认
				// 触发删除事件到事件总线
				eventBus.$emit('deleteNode',this.model.id)
			},
			modifyNode: function() {
				// 可能需要用弹出框的方式来修改节点信息
			}
		}
	}

</script>