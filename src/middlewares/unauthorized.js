export default ({ router, auth, next }) => {
    try {
      return auth.getToken ? router.push({ name: 'Home' }) : next();
    } catch(error) {
        return Promise.reject(error);
    }
  }
  