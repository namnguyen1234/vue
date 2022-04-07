<template>
    <!-- Section: Design Block -->
<section class="">
  <!-- Jumbotron -->
  <div
      class="px-4 py-5 px-md-5 text-center text-lg-start"
      style="background-color: hsl(0, 0%, 96%)"
      >
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight text-primary">
            Create user <br />
          </h1>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <form @submit.prevent="create">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                            type="text"
                            id="form3Example1"
                            class="form-control"
                            v-model="user.first_name"
                            />
                      <label class="form-label" for="form3Example1"
                            >First name</label
                        >
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                            type="text"
                            id="form3Example2"
                            class="form-control"
                            v-model="user.last_name"
                            />
                      <label class="form-label" for="form3Example2"
                            >Last name</label
                        >
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input
                        id="form3Example3"
                        class="form-control"
                        v-model="user.username"
                        />
                  <label class="form-label"
                        >Username</label
                    >
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input
                        type="password"
                        id="form3Example4"
                        class="form-control"
                        v-model="user.password"
                        />
                  <label class="form-label"
                        >Password</label
                    >
                </div>

                <!-- Submit button -->
                <button
                        type="submit"
                        class="btn btn-primary btn-block mb-4"
                        >
                  Create
                </button>

                <!-- Register buttons -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
<!-- Section: Design Block -->
</template>

<script>
import crud from '../api/crudApi.js';

export default {
    name:"Create-form",
    data() {
        return {
            user:{},
        }
    },
    methods: {
        async create() {
            try {
                await crud.insert(this.user);
                await this.$router.push({ name: 'Home' });
            } catch (error) {
                console.error(error);
            }
        }
    },
}
</script>

<style scoped>

</style>