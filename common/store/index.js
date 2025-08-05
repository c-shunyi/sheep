import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= {
	state:{
		isFromAuthentication:false
	},
	mutations:{
		setIsFromAuthentication(state, value){
			state.isFromAuthentication = value
		}
	}
}
export default new Vuex.Store(store)