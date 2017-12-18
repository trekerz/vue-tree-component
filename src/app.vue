<template>
	<!-- 根元素：包含树组件和三个提示框 -->
	<div id="app">
		<tree
		:treeData="treeData"></tree>

		<transition name="box-fade">
			<delete-box
			v-if="showDeleteBox"
			:model="treeData"
			:idDelete="idDelete"
			:nameDelete="nameDelete">
			</delete-box>
		</transition>
		<transition name="box-fade">
			<add-box
			v-if="showAddBox"
			:model="treeData"
			:parentChildren="parentChildren"
			:parentInfo="parentInfo">
			</add-box>
		</transition>
		<transition name="box-fade">
			<modify-box
			v-if="showModifyBox"
			:model="modifyModel">
			</modify-box>
		</transition>
	</div>
</template>

<script>
	import data from './data/json.js'
	import eventBus from './utils/eventBus.js'
	
	import tree from './components/tree.vue'
	import deleteBox from './components/messagebox/delete_node_box.vue'
	import addBox from './components/messagebox/add_child_box.vue'
	import modifyBox from './components/messagebox/modify_node_box.vue'

	export default {
		components: {
			'tree': tree,
			'delete-box': deleteBox,
			'add-box': addBox,
			'modify-box': modifyBox
		},
		data () {
			return {
				treeData: data,
				showDeleteBox: false,
				idDelete: '',
				nameDelete: '',
				showAddBox: false,
				parentChildren: [],
				parentInfo: [],
				showModifyBox: false,
				modifyModel: {}
			}
		},
		mounted () { // 监听各种事件
			let self = this // 注意这里如果不修改this的话，则this是eventBus中的this！！
	    	eventBus.$on('deleteNodeBox', function(name, id) {
	    		self.showDeleteBox = true
	    		self.idDelete = id
	    		self.nameDelete = name
	    	})
	    	eventBus.$on('addChildBox', function(name, id, children) {
	    		self.showAddBox = true
	    		self.parentInfo.splice(0, 2) // 先清空旧数据
	    		self.parentInfo.push(name, id)
	    		self.parentChildren = children
	    	})
	    	eventBus.$on('modifyNodeBox', function(model) {
	    		self.showModifyBox = true
	    		self.modifyModel = model
	    	})
	    	eventBus.$on('cancel', function() {
	    		self.showDeleteBox = false
	    		self.showAddBox = false
	    		self.showModifyBox = false
	    	})
		}
	}
</script>

<style>
	body {
		font-family: "Microsoft YaHei";
		margin: 0 0;
		padding: 0 0;
	}
	#app {
		width: 500px;
		height: 500px;
		border: 1px solid #aaa;
		overflow: auto;
		position: relative;
	}
	.box-fade-enter-active {
		transition: all .6s ease;
	}
	.box-fade-enter {
		opacity: 0;
	}
</style>
