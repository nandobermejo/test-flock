<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <h3 class="md-title">Flock Test</h3>
    </md-toolbar>
    <List></List>
  </div>
</template>

<script>
import List from './components/list';

export default {
  name: 'app',
  components: {
    List
  }
}
</script>


<style lang="scss">
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("default", (
    primary: md-get-palette-color(blue, A200),
    accent: md-get-palette-color(red, A200)
  ));

  @import "~vue-material/dist/theme/all";
  #app{}
</style>
