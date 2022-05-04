<template>
  <div @click='close_' class="cart-bar">
      <div class="cb-content">
        <div @click='close' onMouseOut='this.style.backgroundColor="black",this.style.color="white"' onMouseOver='this.style.backgroundColor="whitesmoke",this.style.color="black"' style='height:30px;backgroundColor:black;color:white;cursor:pointer;fontSize:20px;boxShadow:0 0 3px rgba(0,0,0,0.5);transition:.1s linear' class='cbc-back center'><ion-icon name="arrow-back-outline"></ion-icon></div>
        <div class="cbc-title center">
          <span>SHOPPING CART</span>
        </div>
        <div :key='$store.state.cart.cart.length' class="cbc-items">
          <cart-bar-item v-for='(item,index) in $store.state.cart.cart' :key='index' :item='item' :index='index' :class='"cbi"+index'/>
        </div>
        <div style='padding:10px;fontSize:15px;' v-if='$store.state.cart.cart.length==0'>
            Your shopping cart is empty.
        </div>
        <div v-if='$store.state.cart.cart.length>0' style='justifyContent:space-between' class="cbc-cost center">
            <div style='fontWeight:bolder;padding:0 10px;'>TOTAL:</div>
            <div style='padding:0 10px;color:orangered;fontSize:19px'>${{subtotal}}</div> 
        </div>
        <div v-if='$store.state.cart.cart.length>0' style='justifyContent:space-around;margin:25px 0;' class="cbc-control center">
            <button onMouseOut='this.style.backgroundColor="black"' onMouseOver='this.style.backgroundColor="rgba(0,0,0,0.7)"' style='outline:none;border:none;backgroundColor:black;color:white;fontWeight:light;fontSize:15px;boxShadow:0 0 2px rgba(0,0,0,0.5);width:40%;height:40px;'>VIEW CART</button>
            <button onMouseOut='this.style.backgroundColor="black"' onMouseOver='this.style.backgroundColor="rgba(0,0,0,0.7)"' style='outline:none;border:none;backgroundColor:black;color:white;fontWeight:light;fontSize:15px;boxShadow:0 0 2px rgba(0,0,0,0.5);width:40%;height:40px;'>PAYMENT</button>
        </div>
      </div>
  </div>
</template>

<script>
import CartBarItem from '@/components/Cart/CartBarItem.vue'
export default {
    components:{CartBarItem},
    data() {
        return {
            subtotal:0,
        }
    },
    methods:{
        close() {
            let cart=document.querySelector('#app > div.cart-bar')
            let cartC=document.querySelector('#app > div.cart-bar > div.cb-content')
            cartC.classList.remove('show')
            setTimeout(function(){
                 cart.classList.remove('show')
            },300)
        },
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
    },
    watch:{
        '$store.state.cart.cart'() {
            this.subtotal=0
            this.$store.state.cart.cart.forEach(item => {
                console.log(item)
                if (item.subtotal) {
                    this.subtotal+=item.subtotal
                }
            });
        }
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
    max-height: 100vh;
    overflow-y:auto;
}
.cart-bar .cb-content.show {
    width: 320px;
    height: 100vh;
}
.cart-bar .cb-content .cbc-title{
    font-size: 20px;
    padding:5px;
    border-bottom:2px solid gainsboro ;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
}
</style>