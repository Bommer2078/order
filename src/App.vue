<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <router-view name='histroy'></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name='ordering'></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name='delivery'></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
export default {
  name: 'app',
  components: {
    "app-header":Header
  }
}
</script>

