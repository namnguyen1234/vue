<template>
    <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image">
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <div class="d-flex justify-content-center mb-2">
              <h1>Login</h1>
          </div>
        <form @submit.prevent="onSubmit">
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="text" id="form1Example13"  class="form-control form-control-lg" placeholder="Name" :class="{error: error.status}" v-model="formLogin.username" maxlength="15" required/>
            <p class="error-text" v-if="error.status">{{error.text}}</p>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input type="password" id="form1Example23" class="form-control form-control-lg" placeholder="Password" v-model="formLogin.password"/>
          </div>
          <!-- Submit button -->
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
          <div>
            <router-link to="/register"><h4>register?</h4></router-link>
          </div>
          </div>
          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>

          <div class="d-flex justify-content-between">
            <a class="btn btn-primary btn-lg btn-block" style="background-color: #3b5998" href="#!" role="button">
              <i class="fab fa-facebook-f me-2"></i>Continue with Facebook
            </a>
            <a class="btn btn-primary btn-lg btn-block" style="background-color: #55acee" href="#!" role="button">
              <i class="fab fa-twitter me-2"></i>Continue with Twitter</a>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import authApi from '../api/auth.js';

export default {
    name: "Login-Form",
    components: {
       
    },

    data() {
        return {
            formLogin: {
               username: '' ,
               password: ''
            },

            error: {
                text:'',
                status: false
            },
        }
    },
    methods: {
        async onSubmit() {
           try {
               await authApi.login(this.formLogin);
               this.$router.push({name: 'Home'});
        } catch (error) {
               console.error(error);
            }
        },
    },
}
</script>

<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.error {
    border-color: red;
}
.error-text {
    color: red;
    padding-top: 6px;
}
</style>