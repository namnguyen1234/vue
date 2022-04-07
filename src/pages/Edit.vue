<template>
<div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
<form class="ms-5 me-5 mt-5 mb-5" @submit.prevent="edit">
  <div class="form-group">
    <label>Username</label>
    <input type="text" class="form-control" v-model="user.username" placeholder="Enter Username">
  </div>
  <div class="form-group mt-3">
    <label>Password</label>
    <input type="password" class="form-control form-control-lg" v-model="user.password" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary mt-3">Edit</button>
</form>
</div>
</template>

<script>
import crud from '../api/crudApi.js';

export default {
    name: "form-eidt",

    data() {
        return {
            user: {},
        }
    },

    async created() {
        await Promise.all([
            this.fetchData()
        ]);
    },

    methods: {
        async edit() {
            try {
              await crud.update(this.$route.params.id ,this.user);
              await this.$router.push({ name: 'Home' })
            } catch (error) {
                console.error(error);

            }
        },
        async fetchData() {
            try {
               const { data } = await crud.getById(this.$route.params.id);

               this.user = data.user;
            
            } catch (error) {
                console.error(error);

            }
        }
    },
    
}
</script>

<style scoped>

</style>