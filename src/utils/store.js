Vue.use(Vuex)


// 此模块暂时没什么用处，只是埋个store在这里，以备后用
export default new Vuex.Store({
	state: {
		clicked: false
	},
	mutations: {
		clickToggle (state) {
			state.clicked = !state.clicked
		}
	}
})