<template>
  <div @click='close_' class="wishlist-bar">
      <div class="wb-content">
        <div @click='close' onMouseOut='this.style.backgroundColor="black",this.style.color="white"' onMouseOver='this.style.backgroundColor="whitesmoke",this.style.color="black"' style='height:30px;backgroundColor:black;color:white;cursor:pointer;fontSize:20px;boxShadow:0 0 3px rgba(0,0,0,0.5);transition:.1s linear' class='wbc-back center'><ion-icon name="arrow-back-outline"></ion-icon></div>
        <div class="wbc-title center">
          <span>WISHLIST</span>
        </div>
        <div :key='$store.state.cart.wishlist.length' class="wbc-items">
          <wishlist-bar-item v-for='(item,index) in $store.state.cart.wishlist' :key='index' :item='item' :index='index' :class='"cbi"+index'/>
        </div>
        <div style='padding:10px;fontSize:15px;' v-if='$store.state.cart.wishlist.length==0'>
            Your wishlist is empty.
        </div>
        <div v-if='$store.state.cart.wishlist.length>0' style='justifyContent:space-around;marginTop:25px;' class="wbc-control center">
            <button onMouseOut='this.style.backgroundColor="black"' onMouseOver='this.style.backgroundColor="rgba(0,0,0,0.7)"' style='outline:none;border:none;backgroundColor:black;color:white;fontWeight:light;fontSize:15px;boxShadow:0 0 2px rgba(0,0,0,0.5);width:40%;height:40px;'>VIEW WISHLIST</button>
        </div>
      </div>
  </div>
</template>

<script>
import WishlistBarItem from '@/components/Wishlist/WishlistBarItem.vue'
export default {
    components:{WishlistBarItem},
    methods:{
        close() {
            let wishlist=document.querySelector('#app > div.wishlist-bar')
            let cartC=document.querySelector('#app > div.wishlist-bar > div.wb-content')
            cartC.classList.remove('show')
            setTimeout(function(){
                 wishlist.classList.remove('show')
            },300)
        },
        close_(e) {
            let wishlist=document.querySelector('#app > div.wishlist-bar')
            let cartC=document.querySelector('#app > div.wishlist-bar > div.wb-content')
            if (e.target==wishlist) {
                cartC.classList.remove('show')
                setTimeout(function(){
                    wishlist.classList.remove('show')
                },300)
            }
        },
    },
}
</script>

<style>
.wishlist-bar {
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
.wishlist-bar.show {
    visibility: visible;
    opacity: 1;
}
.wishlist-bar .wb-content {
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
.wishlist-bar .wb-content.show {
    width: 320px;
    height: 100vh;
}
.wishlist-bar .wb-content .wbc-title{
    font-size: 20px;
    padding:5px;
    border-bottom:2px solid gainsboro ;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
}
</style>