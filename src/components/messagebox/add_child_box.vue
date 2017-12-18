<template>
	<div class="box-wrapper">
		<div class="add-child-box">
			<div class="title-message">在“{{ parentName }}”内添加：</div>

			<div
			class="selector">
				<button
				@click="isFolder">{{ fileType }}</button>
				<span>(点击切换)</span>
			</div>

			<div
			class="inputName"
			:class="{'emptyName': emptyName}">
				<span>Name：</span>
				<input
				v-model="nameAdd"
				v-focus="true">
			</div>
			<div
			class="inputID"
			:class="{'emptyId': emptyId}">
				<span>
				&nbsp;&nbsp;&nbsp;ID&nbsp;&nbsp;&nbsp;：
				</span>
				<input
				v-model="idAdd">
			</div>

			<button
			class="add-confirm"
			@click="addChild">确定</button>
			<button
			class="add-cancel"
			@click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
	import eventBus from '../../utils/eventBus.js'

	export default {
		props: {
			model: {},
			parentChildren: Array,
			parentInfo: Array
		},
		data () {
			return {
				idAdd: '',
				nameAdd: '',
				parentName: this.parentInfo.shift(),
				parentId: this.parentInfo.shift(),
				emptyName: false,
				emptyId: false,
				fileType: 'file'
			}
		},
		methods: {
			addChild: function() {
				/*
				* 这里后续可改为更丰富的validate验证
				*/
				if (this.nameAdd === '' && this.idAdd === '') {
					this.emptyName = true
					this.emptyId = true
					return
				} else if (this.nameAdd === '') {
					this.emptyName = true
					this.emptyId = false
					return
				} else if (this.idAdd === '') {
					this.emptyName = false
					this.emptyId = true
					return
				} else {}

				// 注意：非目录节点本身就没有添加按钮

				/*
				* 注意：后续此处要添加id重复判断！
				*/
				this.parentChildren.push({
					name: this.nameAdd,
					id: this.idAdd,
					fileType: this.fileType
				})

				eventBus.$emit('cancel')
			},
			cancel: function() {
				eventBus.$emit('cancel')
			},
			isFolder: function() {
				this.fileType = this.fileType === 'file' ? 'folder' : 'file'
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
	.add-child-box {
		width: 300px;
		height: 195px;
		background-color: #baefbd;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 0 15px #afceb0;
		color: #555;
	}
	.inputID {
		margin: 8px 0 7px 25px;
	}
	.inputName {
		margin: 7px 0 0 25px;
	}
	.inputID input,
	.inputName input {
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 3px 8px;
		font-family: "Mircosoft YaHei";
		outline: none;
	}
	.inputID input:focus,
	.inputName input:focus {
		box-shadow: 0 0 10px #4fa053;
	}
	.emptyName input,
	.emptyId input {
		box-shadow: 0 0 10px #ffaeae;
	}
	.title-message {
		margin: 18px 0 5px 30px;
		font-family: "Mircosoft YaHei";
		font-size: 1em;
		color: #000;
	}
	.selector {
		display: flex;
		justify-content: center;
	}
	.selector span {
		line-height: 34px;
		margin-left: 5px;
		font-size: .3em;
	}
	.selector button {
		width: 50px;
		height: 30px;
		margin-top: 4px;
		background-color: #fff;
		border: none;
		border-radius: 4px;
		font-size: .9em;
		color: #000;
		outline: none;
	}
	.selector button:hover {
		cursor: pointer;
	}
	.selector button:active {
		background-color: #f6f6f6;
	}
	.add-confirm {
		margin-left: 170px;
		width: 50px;
		height: 30px;
		background-color: #27ca1b;
		border: none;
		border-radius: 4px;
		font-size: .6em;
		color: #e6f7ea;
		outline: none;
	}
	.add-confirm:hover {
		background-color: #22b117;
		cursor: pointer;
	}
	.add-confirm:active {
		background-color: #22a117;
		cursor: pointer;
	}
	.add-cancel {
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
	.add-cancel:hover {
		cursor: pointer;
		background-color: #eee;
	}
	.add-cancel:active {
		cursor: pointer;
		background-color: #ddd;
	}
</style>
