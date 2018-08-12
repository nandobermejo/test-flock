<template>
  <div id="list">
    <div class="spinner-container" v-if="loading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item" v-if="!loading">
      <md-card>
        <md-card-header>
          <div class="slider-label">Crash Rate</div>
          <div class="slider-container">
            <vue-slider v-bind="sliderConfig" v-model="sliderConfig.value" @callback="val => sliderCallback(val)"></vue-slider>
          </div>
        </md-card-header>
      </md-card>
      <div class="md-layout md-gutter">
        <Item v-for="item in filteredItems" :key="item.id"
              v-bind:item="item"
              class="md-layout-item md-xsmall-size-100 md-small-size-50 md-size-33 md-alignment-top-center">
        </Item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import vueSlider from 'vue-slider-component';
import Item from './Item.vue';

const SLIDER_CONFIG = {
  value: [0, 100],
  width: '100%',
  height: 8,
  dotSize: 25,
  min: 0,
  max: 100,
  interval: 10,
  disabled: false,
  show: true,
  formatter: "{value}%",
  tooltip: false,
  piecewise: true,
  piecewiseLabel: true
};

export default {
  name: 'list',
  data() {
    return {
      loading: false,
      items: null,
      filteredItems: null,
      sliderConfig: SLIDER_CONFIG
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.loading = true;
      axios.get('/api/drones')
      .then((res) => {
        this.items = this.filteredItems = res.data.map(item => {
          item.rate = item.numFlights ? ((item.numCrashes / item.numFlights) * 100).toFixed(0) : 0;
          return item;
        });
      })
      .catch((err) => console.log(err))
      .then((res) => this.loading = false)
    },
    sliderCallback: function(value) {
      this.filteredItems = this.items.filter(item => (item.rate >= value[0] && item.rate <= value[1]));
    }
  },
  components: {
    vueSlider,
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
