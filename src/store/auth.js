import authApi from "../api/auth";

export default {
	namespaced: true,

	state: {
		user: null,
		token: null
	},

	getters: {
		user(state) {
			return state.user;
		},

		token(state) {
			return state.token;
		},
	},

	mutations: {
		setUser(state, user) {
			state.user = user;
		},

		setToken(state, token) {
			state.token = token;
		}
	},

	actions: {
		setToken({ commit }, token) {
			commit('setToken', token);
		},

		setUser({ commit }, user) {
			commit('setUser', user);
		},

		resetState({ state }) {
			state.user = null;
			state.token = null;
		},
        getUser() {
            const { data } = authApi.me();

			return data;
        }
	}
}
