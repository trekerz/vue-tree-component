<template>
	<div class="box-wrapper">
		<div class="delete-child-box">
			<div class="title-message">要删除“{{ nameDelete }}”吗？</div>
			<button
			class="delete-confirm"
			v-focus="true"
			@click="deleteNode"
			@keyup.enter="deleteNode">确定</button>
			<button
			class="delete-cancel"
			@click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
	import eventBus from '../../utils/eventBus.js'

	export default {
		props: {
			model: {},
			idDelete: '',
			nameDelete: ''
		},
		methods: {
			deleteNode: function() { // 递归搜索id并删除匹配id的项
				return (function fn(data, id) {
					for (let i = 0; i < data.length; i++){
						if (data[i].id === id) {
							data.splice(i, 1)
							eventBus.$emit('cancel')
							return
						}
					}
					for (let i = 0; i < data.length; i++){
						if (data[i].children) {
							if (data[i].children.length !== 0) {
								fn(data[i].children, id)
							}
						}
					}
				})(this.model.children, this.idDelete)
			},
			cancel: function() {
				eventBus.$emit('cancel')
			}
		},
		directives: {
			focus: {
				inserted: function(el) {
					el.focus()
				}
			}
		}
	}
</script>

<style>
	.box-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.delete-child-box {
		width: 300px;
		height: 100px;
		background-color: #f1c7ca;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 0 15px #d4acac;
	}
	.title-message {
		margin: 18px 0 5px 30px;
		color: #000;
		font-family: "Mircosoft YaHei";
		font-size: 1em;
	}
	.delete-confirm {
		margin-left: 170px;
		width: 50px;
		height: 30px;
		background-color: #e22;
		border: none;
		border-radius: 4px;
		font-size: .6em;
		color: #fdd;
		outline: none;
	}
	.delete-confirm:hover {
		background-color: #d22;
		cursor: pointer;
	}
	.delete-confirm:active {
		background-color: #c22;
		cursor: pointer;
	}
	.delete-cancel {
		margin: 10px 10px;
		width: 50px;
		height: 30px;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: .6em;
		color: #000;
		outline: none;
	}
	.delete-cancel:hover {
		cursor: pointer;
		background-color: #eee;
	}
	.delete-cancel:active {
		cursor: pointer;
		background-color: #ddd;
	}
</style>
