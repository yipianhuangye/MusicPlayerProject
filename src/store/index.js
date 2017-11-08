import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters.js'
import state from './state.js'
import mutations from './mutation.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_EVN !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict:debug,
	plugins:debug ? [createLogger()] : []
})