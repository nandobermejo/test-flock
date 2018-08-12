<template>
  <div class="item">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{item.name}}</div>
          <div class="md-subhead">{{item.price}} {{item.currency}}</div>
        </md-card-header-text>
        <md-card-media>
          <img src="https://cdn3.iconfinder.com/data/icons/misc-vol-5/512/cam_camera_drone_flight_film_video-512.png" alt="Drone">
        </md-card-media>
      </md-card-header>
      <md-card-actions>
        <md-button class="md-icon-button md-raised md-mini md-gutter">
          <md-icon>flight_takeoff</md-icon>
        </md-button>
        <md-button class="md-icon-button md-mini md-gutter">
          {{item.numFlights}}
        </md-button>
        <md-button class="md-icon-button md-raised md-mini md-gutter">
          <md-icon>whatshot</md-icon>
        </md-button>
        <md-button class="md-icon-button md-mini md-gutter">
          {{item.numCrashes}}
        </md-button>
        <md-button class="md-icon-button md-raised md-mini md-accent md-gutter">
          <md-icon>insert_chart_outlined</md-icon>
        </md-button>
        <md-button class="md-icon-button md-mini md-gutter">
          {{ percentage }}
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>


<script>
  export default {
    name: 'item',
    props: ['item'],
    data() {
      return {}
    },
    computed: {
      percentage: function () {
        if(this.item.numFlights === 0) return 'NA'
        return ((this.item.numCrashes / this.item.numFlights) * 100).toFixed(0) + '%';;
      }
    },
    filters: {},
    components: {},
  }
</script>


<style lang="scss">
  .item{
    margin-top: 10px;
  }
</style>
