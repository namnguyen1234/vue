import axios from '../plugins/axios';
import Auth from '../plugins/auth';
import store from '../store';

const auth = new Auth();

export default {
	async login(credentials) {
		const { data } = await axios({
            url: `http://localhost/api/index.php?controller=api&action=logIn`,
            method: 'POST',
            data: credentials
        });
        
        await auth.setToken(data.token);
        await store.dispatch('auth/setToken', data.token);
        await store.dispatch('auth/setUser', data.user);

        return data;
	},

    
	async me() {
		const { data } = await axios({
            url: `http://localhost/api/index.php?controller=api&action=me`,
            method: 'GET',
        });
        
        await store.dispatch('auth/setUser', data.user);

        return data;
	},

	// async logout() {
	// 	const { data } = await axios({
    //         url: '/api/auth/logout'
    //     });

    //     await auth.removeToken();
    //     await store.dispatch('auth/setToken', null);
    //     await store.dispatch('auth/setUser', null);

    //     return data;
	// }
}
