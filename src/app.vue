<template>
	<!-- 根元素 -->
	<ul id="app">
		<item
		class="item"
		:model="treeData">
		</item>
	</ul>
</template>

<script>
	import item from './item.vue'
	import eventBus from '../eventBus.js'

	// 后台数据（JSON）
	var data = {
	    name: 'My Tree',
	    id: '0',
	    children: [
	        { name: 'hello', id: '1'},
	        { name: 'wat', id: '2'},
	        {
	            name: 'child folder',
	            id: '3',
	            children: [
	            	{
	                    name: 'child folder',
	                    id: '3-1',
	                    children: [
	                        { name: 'hello', id: '3-1-1'},
	                        { name: 'wat', id: '3-1-2'}
	                    ]
	                },
	                { name: 'hello', id: '3-2'},
	                { name: 'wat', id: '3-3'},
	                {
	                    name: 'child folder',
	                    id: '3-4',
	                    children: [
	                        { name: 'hello', id: '3-4-1'},
	                        { name: 'wat', id: '3-4-2'}
	                    ]
	                }
	            ]
	        }
	    ]
	}

	// 这个方法用来对监听到的删除事件作出删除动作
	// 由于事件监听用了eventBus，导致处理方法必须放到全局作用域中来。
	function recurDelete(data, id) {
		return (function fn(data, id) {
			for (var i = 0; i < data.length; i++){
				if (data[i].id === id) {
					data.splice(i, 1)
					return
				}
			}
			for (var i = 0; i < data.length; i++){
				if (data[i].children) {
					if (data[i].children.length !== 0) {
						fn(data[i].children, id)
					}
				}
			}
		})(data, id)
	}

	export default {
		components: {
			"item": item
		},
	    data () {
	    	return {
	        	treeData: data
	    	}
	    },
	    mounted () {
	    	// 注意：这个删除方法直接操作data！不可逆转！
	    	eventBus.$on('deleteNode', function(id) {

	    		// 不能删除根节点
	    		// （这里也包含了根节点没有children时的处理——直接返回）
	    		if (id === '0') {
					return
				}

	    		recurDelete(data.children, id)
	    	})
	    }
	}
</script>

<style>
	body {
		font-family: Menlo, Consolas, monospace;
	}
	.item {
		cursor: pointer;
	}
	ul {
		padding-left: 1em;
		line-height: 1.5em;
		list-style-type: dot;
	}
</style>