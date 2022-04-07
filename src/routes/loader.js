import { createRouter, createWebHistory } from 'vue-router';
import routes from './index.js';
import store from '../store';
import Auth from '../plugins/auth.js';

const auth = new Auth();
const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "active",
  scrollBehavior () {
    return { x: 0, y: 0 };
  }
});

const nextFactory = (context, middleware, index) => {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if(!subsequentMiddleware) {return context.next;}

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({
      ...context,
      next: nextMiddleware
    });
  };
};

router.beforeEach(async (to, from, next) => {
  if(to.name === 'Logout') {
    return next({ name: 'Login' });
  }

  if(!store.getters['auth/user'] && to.name !== 'Login') {
    try {
      await store.dispatch('auth/getUser');
    } catch(error) {
      return Promise.reject(error);
    }
  }

  const user = store.getters['auth/user'];

  if (user && to.name !== 'Home') {
    return next({name: 'Home'});
  }

  if(!to.meta.middleware) {
    return next();
  }

  const middleware = Array.isArray(to.meta.middleware) ?
    to.meta.middleware :
    [to.meta.middleware];

  const context = {
    from,
    next,
    router,
    to,
    auth,
    store
  };
  const nextMiddleware = nextFactory(context, middleware, 1);

  return middleware[0]({
    ...context,
    next: nextMiddleware
  });

});

router.beforeResolve((to, from, next) => {
  if (to.name) {
  
    document.title = to.meta.title || "Home";
  }
  return next();
})

export default router;














