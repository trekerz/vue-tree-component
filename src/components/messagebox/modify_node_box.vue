<template>
	<div class="box-wrapper">
		<div class="modify-child-box">
			<div class="title-message">修改“{{ model.name }}”：</div>

			<div
			class="inputName">
				<span>Name：</span>
				<input
				v-model="nameAdd"
				v-focus="true"
				@keyup.enter="modifyNode">
				<span
				class="notice">(选填)</span>
			</div>
			<div
			class="inputID">
				<span>
				&nbsp;&nbsp;&nbsp;ID&nbsp;&nbsp;&nbsp;：
				</span>
				<input
				v-model="idAdd"
				@keyup.enter="modifyNode">
				<span
				class="notice">(选填)</span>
			</div>

			<button
			class="modify-confirm"
			@click="modifyNode">确定</button>
			<button
			class="modify-cancel"
			@click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
	import eventBus from '../../utils/eventBus.js'

	export default {
		props: {
			model: {}
		},
		data () {
			return {
				idAdd: '',
				nameAdd: ''
			}
		},
		methods: {
			modifyNode: function() {
				/*
				* 注意：后续此处要添加id重复判断！
				*/
				if (this.nameAdd !== '') {
					this.model.name = this.nameAdd
				}
				if (this.idAdd !== '') {
					this.model.id = this.idAdd
				}

				eventBus.$emit('cancel')
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
	.modify-child-box {
		width: 300px;
		height: 160px;
		background-color: #f5dc89;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 0 15px #ffb51e;
		color: #555;
	}
	.inputID {
		margin: 8px 0 7px 16px;
	}
	.inputName {
		margin: 7px 0 0 16px;
	}
	.inputID input,
	.inputName input {
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 3px 8px;
		font-family: "Mircosoft YaHei";
		outline: none;
	}
	.emptyName input,
	.emptyId input {
		box-shadow: 0 0 10px #ffaeae;
	}
	.notice {
		font-size: .3em;
	}
	.title-message {
		margin: 18px 0 5px 30px;
		font-family: "Mircosoft YaHei";
		font-size: 1em;
		color: #000;
	}
	.modify-confirm {
		margin-left: 170px;
		width: 50px;
		height: 30px;
		background-color: #f59b00;
		border: none;
		border-radius: 4px;
		font-size: .6em;
		color: #f6f7fa;
		outline: none;
	}
	.modify-confirm:hover {
		background-color: #e08e02;
		cursor: pointer;
	}
	.modify-confirm:active {
		background-color: #ce8302;
		cursor: pointer;
	}
	.modify-cancel {
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
	.modify-cancel:hover {
		cursor: pointer;
		background-color: #eee;
	}
	.modify-cancel:active {
		cursor: pointer;
		background-color: #ddd;
	}
</style>
