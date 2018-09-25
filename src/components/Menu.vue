<template>
<div class="row">
  <!--菜单部分-->
  <div class="col-sm-12 col-md-8">
    <table class="table text-center">
      <thead class="thead-defualt">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>添加</th>
        </tr>
      </thead>
      <tbody v-for='item in getMenuItems'>
      <tr>
        <td><strong>{{item.name}}</strong></td>
        <td><small>{{item.description}}</small></td>
      </tr>
      <tr v-for='options in item.options'>
        <td>{{options.size}}</td>
        <td>{{options.price}}</td>
        <td><button class='btn btn-sm btn-outline-success' @click="addOrder(item,options)">+</button></td>
      </tr>
      </tbody>
    </table>
  </div>

  <!--购物车部分-->
  <div class="col-sm-12 col-md-4">
    <div v-if="baskets.length < 1">{{basketsText}}</div>
    <div v-else>
      <table class="table text-center">
        <thead class="thead-defualt">
        <tr>
          <th>数量</th>
          <th>品种</th>
          <th>价格</th>
        </tr>
        </thead>
        <tbody v-for="item in baskets">
        <tr>
          <td>
            <button class="btn-sm btn" style='background: transparent' @click="deGoods(item)">-</button>
            <small>{{item.quantity}}</small>
            <button class="btn btn-sm" style='background: transparent' @click="addGoods(item)">+</button>
          </td>
          <td>{{item.name + item.size + "寸"}}</td>
          <td>{{item.price * item.quantity}}</td>
        </tr>
        </tbody>
      </table>
      <p>总价：{{total}}</p>
      <button @click="success" class="btn btn-success btn-block">提交订单</button>
    </div>
  </div>
</div>
</template>

<script>
  import {AV} from '../leancloud';
    export default {
      name: "Menu",
      data(){
        return {
          baskets:[],
          basketsText:'还没有添加任何商品',
          getMenuItems:[]
        }
      },
      created(){
        this.addData();
      },
      beforeRouteEnter(to,form,next){
        next(vm => {
          if(vm.$store.getters.isLogin != true){
            alert('请先登录');
            vm.$router.push('./Login');
          }
        });
      },
      methods:{
        addOrder:function(item,options){
          let basket = {
            name:item.name,
            size:options.size,
            price:options.price,
            quantity:1
          }
          if(this.baskets.length>0){
            let result = this.baskets.filter(function(basket){
              return (basket.name === item.name&&basket.size === options.size)
            });
            if(result.length > 0&& result!=null){
              result[0].quantity++;
            }else{
              this.baskets.push(basket);
            }
          }else{
            this.baskets.push(basket);
          }
        },
        addGoods:function(item){
          item.quantity++;
        },
        deGoods:function(item){
          item.quantity--
          if(item.quantity<1){
            this.removeGoods(item);
          }
        },
        removeGoods:function(item){
          this.baskets.splice(this.baskets.indexOf(item),1)
        },
        addData:function(){
          let oldData = new AV.Query('Items');
          let getMenuItems = this.getMenuItems;
          oldData.find().then(function (result) {
            for (var i=0;i<result.length;i++){
              getMenuItems.push(result[i].attributes);
            }
          })
        },
        success:function(){
          alert('订购成功！');
          this.baskets = [];
        }
      },
      computed:{
        total(){
          let totalCost = 0;
          for(var i=0;i<this.baskets.length;i++){
            totalCost += this.baskets[i].price * this.baskets[i].quantity;
          }
          return totalCost
        }
      }

    }
</script>
