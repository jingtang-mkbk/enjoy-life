import Vue from 'vue'
import Vuex, {
	createLogger
} from 'vuex'
import user from './modules/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		user
	},
	plugins: [createLogger()]
})

export default store