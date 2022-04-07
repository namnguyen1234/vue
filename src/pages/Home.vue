<template>
  <link
    href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
    rel="stylesheet"
    id="bootstrap-css"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css"
    rel="stylesheet"
    type="text/css"
  />

  <div class="container">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default panel-table">
          <div class="panel-heading">
            <div class="row">
              <div class="col col-xs-6">
                <h3 class="panel-title">Panel</h3>
              </div>
              <div class="col col-xs-6 text-right">
               <a :href="'http://localhost:3000/create'" class="btn btn-sm btn-primary btn-create">
                  Create User
                 </a>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-striped table-bordered table-list">
              <thead>
                <tr>
                  <th ><em class="fa fa-cog"></em></th>
                  <th class="hidden-xs">ID</th>
                  <th>username</th>
                  <th>firstname</th>
                  <th>lastname</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, i) in users" :key="i">
                  <td align="center">
                   <a :href="'http://localhost:3000/edit/' + user.id" class="btn btn-default">
                     <em class="fa fa-pencil"></em>
                    </a>
                    <a @click.prevent="destroys(user.id)" class="btn btn-danger btn-magrin"
                      ><em class="fa fa-trash"></em
                    ></a>
                  </td>
                  <td class="hidden-xs">{{ i + 1 }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.first_name  }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <paginate :data-page="dataPage" @changePage="changePage($event)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crud from '../api/crudApi.js';
import paginate from '../components/paginate.vue';
export default {
     name:"form-Detail",
     components: {
        paginate
     },

     data() {
         return {
            users: [],
            dataPage: {},
         }
     }, 
     async created() {
        await this.getUser();
     },
     methods: {
        async getUser(page = 1) {
          try {
               const { data } = await crud.getList(page);

               this.users = data.user;
               this.dataPage = data.dataPage;
        } catch (error) {
               console.error(error);
            }
        },

        async destroys(id) {
            try {
                await crud.destroys(id);
                await this.getUser();
            } catch (error) {
                console.error(error);
            }
        },

        async changePage(page) {
            await this.getUser(page);
        }

     },
}
</script>
    
<style scoped>
.panel-table .panel-body {
  padding: 0;
}

.panel-table .panel-body .table-bordered {
  border-style: none;
  margin: 0;
}

.panel-table .panel-body .table-bordered > thead > tr > th:first-of-type {
  text-align: center;
  width: 100px;
}

.panel-table .panel-body .table-bordered > thead > tr > th:last-of-type,
.panel-table .panel-body .table-bordered > tbody > tr > td:last-of-type {
  border-right: 0px;
}

.panel-table .panel-body .table-bordered > thead > tr > th:first-of-type,
.panel-table .panel-body .table-bordered > tbody > tr > td:first-of-type {
  border-left: 0px;
}

.panel-table .panel-body .table-bordered > tbody > tr:first-of-type > td {
  border-bottom: 0px;
}

.panel-table .panel-body .table-bordered > thead > tr:first-of-type > th {
  border-top: 0px;
}

.panel-table .panel-footer .pagination {
  margin: 0;
}

/*
used to vertically center elements, may need modification if you're not using default sizes.
*/
.panel-table .panel-footer .col {
  line-height: 34px;
  height: 34px;
}

.panel-table .panel-heading .col h3 {
  line-height: 30px;
  height: 30px;
}

.panel-table .panel-body .table-bordered > tbody > tr > td {
  line-height: 34px;
}

.btn-magrin {
  margin-left: 4px;
}
</style>