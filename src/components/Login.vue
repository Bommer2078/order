<template>
  <div class="row mt-3">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <div class="card-body">
          <img src="../assets/user.png" alt="" class="mx-auto d-block">
          <form @submit.prevent='onSubmit'>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class='form-control' v-model='email'>
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class='form-control' v-model='password'>
            </div>
            <button type="submit" class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
    <div class="myModal" v-show="toggle">
      <span class="mx-auto d-block">请稍后...</span>
    </div>
  </div>
</template>

<script>
  import { AV } from '../leancloud.js';
  export default {
    name: "Login",
    data(){
      return {
        email:'',
        password:'',
        toggle:false
      }
    },
    beforeRouteEnter(to,from,next){
      next(vm => {
        vm.$store.commit('userState',null)
      })
    },
    methods:{
      onSubmit:function() {
        if(this.email!=''&&this.password!=''){
            var userName = new AV.Query('Users');
            var passWord = new AV.Query('Users');
            var vueComponent = this;
            this.toggle = true;
            userName.matches('email','^' + this.email + '$');
            passWord.matches('password','^' + this.password + '$');
            var query = AV.Query.and(userName, passWord);
            query.find().then(function(results){
              vueComponent.toggle = false;
              if(results!=null&&results.length!=0){
                console.log('1')
                console.log(results[0])
                console.log(results[0].attributes.email)
                vueComponent.$store.dispatch('setUser',results[0].attributes.email);
                vueComponent.$router.push('./Menu');
              }else{
                vueComponent.$store.dispatch('setUser',null);
                alert('账号或密码错误');
              }
            },function(error){
              console.log('错误');
            });
        }else{
          alert('请输入账号和密码');
        }

      }
    }
  }
</script>

<style scoped>
  .myModal{
    position: fixed;
    top:0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #ccc;
    opacity:0.8;
    box-sizing: border-box;
    padding-top:30vh;
  }
  .myModal >span{
    color: lightcoral;
    font-size:28px;
    width:fit-content;
  }

</style>
