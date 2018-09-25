import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    isLogin:false,
    currentUser:null
  },
  getters:{
    currentUser:state => state.currentUser,
    isLogin:state => state.isLogin
  },
  mutations:{
    userState(state,payload){
      if(payload){
        state.currentUser = payload;
        state.isLogin = true;
      }else{
        state.isLogin = false;
        state.currentUser = null;
      }
    }
  },
  actions:{
    setUser(context,payload){
      context.commit('userState',payload);
    }
  }
});
