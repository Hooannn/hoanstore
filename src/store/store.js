import Vuex from "vuex";
import Vue from "vue";
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'
import product from '@/store/modules/product'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    cart,
    user,
    product,
  }
});
export default store;
