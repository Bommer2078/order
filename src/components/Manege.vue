<template>
<div class="row">
  <form class="col-sm-12 col-md-8">
    <h3 class="text-muted my-5">添加新的Pizza</h3>
    <div class="form-group row">
      <label class="col-sm-1">品种</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.itemName">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">描述</label>
      <div class="col-sm-11">
        <textarea rows="5" class="form-control" v-model="newItem.description"></textarea>
      </div>
    </div>
    <p><strong>选项1</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.size1">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.price1">
      </div>
    </div>

    <p><strong>选项2</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.size2">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newItem.price2">
      </div>
    </div>
    <div class="form-group row">
      <button type="button" @click="sendData" class="btn btn-success btn-block">添加</button>
    </div>
  </form>
  <div class="col-sm-12 col-md-4">
    <h3 class="text-muted my-5">菜单</h3>
    <div v-if="oldItem.length == 0"><strong>空空如也~</strong></div>
    <table class="table" v-else>
      <thead class="thead-defualt">
      <tr>
        <th>品种</th>
        <th>删除</th>
      </tr>
      <tr v-for="item in oldItem">
        <td><strong>{{item.name}}</strong></td>
        <td>
          <button @click="deletData(item)" class="btn btn-outline-danger btn-sm">&times</button>
        </td>
      </tr>
      </thead>
    </table>
  </div>
</div>
</template>

<script>
  import {AV} from '../leancloud';
    export default {
      name: "Manege",
      data(){
          return {
            newItem:{},
            oldItem:[]
          }
      },
      created(){
        this.addData()
      },
      beforeRouteEnter(to,from,next){
        next(vm => {
          if(vm.$store.getters.isLogin != true){
            alert('请先登录');
            vm.$router.push('./Login');
          }
        });
      },
      methods:{
        addData:function(){
          let oldData = new AV.Query('Items');
          let oldItem = this.oldItem;
          oldData.find().then(function(result){
            for(var i=0;i<result.length;i++){
              result[i].attributes.id = result[i].id;
              oldItem.push(result[i].attributes);
            }
          });
        },
        deletData:function(item){
          for(let k in this.oldItem){
            if(item.id === this.oldItem[k].id){
              this.oldItem.splice(k,1);
              let items = AV.Object.createWithoutData('Items', item.id);
              items.destroy().then(function (success) {
                // 删除成功
                console.log(success);
              }, function (error) {
                // 删除失败
                console.log(error);
              });
            }
          }
        },
        sendData:function(){
          let newItem = {
            'name':this.newItem.itemName,
              'description':this.newItem.description,
              'options': [{
              'size':this.newItem.size1,
              'price':this.newItem.price1
            }, {
              'size':this.newItem.size2,
              'price':this.newItem.price2
            }]
          };
          if(this.preventUndefine(newItem)){
            var Items = AV.Object.extend('Items');
            var item = new Items();
            var theVue = this.$router;
            item.save(newItem).then(function(){
              console.log('添加成功');
              theVue.push('./Menu');
            });
          }else{
            alert('请补全所有信息');
          }
        },
        preventUndefine:function(data){
          for(let k in data){
            if(typeof data[k] == 'object'){
              if(this.preventUndefine(data[k]) == true){
                continue;
              }else{
                return false
              }
            }
            else if(data[k] == undefined||data[k]==''){
              return false
            }
          }
          return true
        }
      }
    }
</script>
