<template>
  <div @click='close_' class="cart-bar">
      <div class="cb-content">
        
        <div class="cb-title">
          <span>Cart</span>
        </div>
        <div class="cb-items">
          <cart-bar-item v-for='item in $store.state.cart.cart' :key='item.key' :item='item'/>
        </div>
      </div>
  </div>
</template>

<script>
import CartBarItem from '@/components/Cart/CartBarItem.vue'
export default {
    components:{CartBarItem},
    methods:{
        close_(e) {
            let cart=document.querySelector('#app > div.cart-bar')
            let cartC=document.querySelector('#app > div.cart-bar > div.cb-content')
            if (e.target==cart) {
                cartC.classList.remove('show')
                setTimeout(function(){
                    cart.classList.remove('show')
                },300)
            }
        },
    }
}
</script>

<style>
.cart-bar {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    z-index: 500;
    visibility: hidden;
    opacity: 0;
}
.cart-bar.show {
    visibility: visible;
    opacity: 1;
}
.cart-bar .cb-content {
    width: 0;
    height: 0;
    position:absolute;
    right:0;
    top:0;
    background-color:white;
    transition:.3s linear;
}
.cart-bar .cb-content.show {
    width: 320px;
    height: 100vh;
}
</style>