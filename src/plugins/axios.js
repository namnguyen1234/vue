import axios from 'axios';
import store from '../store';
import Auth from '../plugins/auth';
import router from '../routes/loader';

const auth = new Auth();

axios.interceptors.request.use( (config) => {
  // clear request error
  config.headers.common['Cache-Control'] = 'no-cache';
  config.headers.common['Pragma'] = 'no-cache';

  if(auth.getToken) {
    config.headers.Authorization = `Bearer ${auth.getToken}`;
  }
  return config;
},  (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if(!error.response) {
      return Promise.reject(error);
    }
    const { status } = error.response;

    if(status === 400) {
      await store.dispatch('auth/setUser', null);
      auth.removeToken();
      return router.push({ name: 'Login' });
    }

  
    if(status === 401) {
      await store.dispatch('auth/setUser', null);
      auth.removeToken();
      return router.push({ name: 'Login' });
    }

    return Promise.reject(error);
  }
);
export default axios;
//cấu hình trước khi load  route và sau khi load route


