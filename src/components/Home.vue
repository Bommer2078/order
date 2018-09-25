<template>
  <div class="home-banner col-sm-12 text-center">
    <div>
      <h1>欢迎大家品尝pizza</h1>
      <h2>这里有你非常喜欢的pizza</h2>
      <button v-on:click="goToMenu" class="btn btn-success">快去点单吧！！！ </button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Home",
      methods:{
          goToMenu:function(){
            this.$router.push('/Menu');
          }
      }
    }
</script>

<style scoped>
  .home-banner{
    width: 100%;
    padding: 10%;
    height: 85vh;
    background: url("../assets/pizza.jpg");
  }
  h1,h2{
    margin:6%;
  }

  .home-banner > div{
    background: #eee;
    opacity: 0.8;
    max-width: 70vw;
    margin: 0 auto;
    padding: 20px 0;
  }
</style>
