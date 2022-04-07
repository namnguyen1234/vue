<template>
<nav>
  <ul class="pagination justify-content-end">
    <li class="page-item"
      :class="{'disabled': dataPage.page == 1}"
    >
      <a class="page-link" href="#" @click="$emit('changePage', dataPage.page - 1)">Previous</a>
    </li>

    <li v-for="page in dataPage.total" :key="page" 
      class="page-item"
      :class="{'active': page == dataPage.page}"
      >
      <a class="page-link" href="#" @click="$emit('changePage', page)">{{ page }}</a>
    </li>

    <li class="page-item"
      :class="{'disabled': dataPage.page == dataPage.total}"
    >
      <a class="page-link" href="#" @click="$emit('changePage', dataPage.page + 1)">Next</a>
      </li>
  </ul>
</nav>
</template>

<script>

export default {
    name:"paginate-form",
    props: {
      dataPage: {
        type: Object,
        default: () => {}
      }
    },
    emits: ['changePage']
}
</script>
