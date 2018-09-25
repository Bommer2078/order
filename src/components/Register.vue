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
            <div class="form-group">
              <label for="confirm-password">确认密码</label>
              <input type="password" class='form-control' v-model='confirmPassword'>
            </div>
            <button type="submit" class="btn btn-block btn-success">注册</button>
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
    name: "Register",
    data(){
      return {
        email:'',
        password:'',
        confirmPassword:'',
        toggle:false
      }
    },
    methods:{
      onSubmit:function(){
        if(this.password===this.confirmPassword&&this.email!=''&&this.password!=''){
          var Users = AV.Object.extend('Users');
          var user = new Users();
          var theEmail = new AV.Query('Users');
          var vueComponent = this;
          this.toggle = true;
          const formData = {
            email:this.email,
            password:this.password
          };
          theEmail.matches('email','^' + formData.email + '$');
          theEmail.find().then(function(results){
            if(results.length==0){
              user.save(formData).then(()=> {
                console.log('注册成功');
                vueComponent.toggle = false;
                vueComponent.$router.push('./Login');
              });
            }else{
              vueComponent.toggle = false;
              alert('该邮箱已被注册，请登录');
            }
          });
        }else if(this.email==''){
          alert('请输入邮箱');
        }else{
          alert('输入的两次密码不一致');
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
