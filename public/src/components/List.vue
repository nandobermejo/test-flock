<template>
  <div id="list">
    <div class="spinner-container" v-if="loading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item" v-if="!loading">
      <div class="md-layout md-gutter">
        <Item v-for="item in items" :key="item.id"
              v-bind:item="item"
              class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 md-alignment-top-center">
        </Item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Item from './Item.vue';

export default {
  name: 'list',
  data() {
    return {
      loading: false,
      items: null
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.loading = true;
      axios.get('http://localhost:3000/api/drones')
      .then((res) => this.items = res.data)
      .catch((err) => console.log(err))
      .then((res) => this.loading = false)
    }
  },
  components: {
    Item
  }
}
</script>


<style lang="scss">
  #list{
    background: #ccc;
    min-height: 100vh;
    padding: 10px;

    .spinner-container{
      text-align: center;
    }
  }
</style>
