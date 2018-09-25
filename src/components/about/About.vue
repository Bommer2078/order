<template>
  <div class="row mb-5">
    <div class="col-lg-4">
      <div class=" list-group mb-5">
        <router-link tag="link" to="/Histroy" class="nav-link">
          <a class="list-group-item list-group-item-action">历史订单</a>
        </router-link>
        <router-link tag="link" to="/Contact" class="nav-link">
          <a class="list-group-item list-group-item-action">联系我们</a>
        </router-link>
        <router-link tag="link" to="Ordering" class="nav-link">
          <a class="list-group-item list-group-item-action">点餐文档</a>
        </router-link>
        <router-link tag="link" to="Delivery" class="nav-link">
          <a class="list-group-item list-group-item-action">快递信息</a>
        </router-link>
      </div>
    </div>
    <div class="col-lg-8">
      <router-view></router-view>
      <router-view name="contact"></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>
