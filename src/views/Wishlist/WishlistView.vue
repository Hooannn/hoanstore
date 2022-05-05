<template>
  <div class="wishlist-view">
      <div v-if='$store.state.cart.wishlist.length==0'>
        It seem your wishlist is empty. <span @click='$router.push({name:"shop",params:{page:1}})' style='cursor:pointer' onMouseOut='this.style.color="black"' onMouseOver='this.style.color="blue"'>Go to shop ?</span>
      </div>
      <div v-if='$store.state.cart.wishlist.length>0' class="wv-header">
          <div class='wvh-id center'>
              <span>ID</span>
          </div>
          <div class='wvh-item center'>
              <span>ITEM</span>
          </div>
      </div>
      <div v-if='$store.state.cart.wishlist.length>0' :key='"wvi"+$store.state.cart.wishlist.length' class="wv-items">
        <wishlist-view-item v-for='(item,index) in $store.state.cart.wishlist' :key='"wvi"+index' :item='item' :id='(index+1)'/>
      </div>
  </div>
</template>

<script>
import WishlistViewItem from '@/components/Wishlist/WishlistViewItem.vue'
export default {
  components:{ WishlistViewItem }, 
}
</script>

<style>
.wishlist-view {
    width: 768px;
    margin:50px auto;
    display: flex;
    flex-direction: column;
    position: relative;
}
.wishlist-view .wv-header{
    width: 100%;
    height: 50px;
    background-color: orange;
    display: flex;
    color:white;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
.wishlist-view .wv-header .wvh-id{
    width: 50px;
    border-radius: 2px solid black;
}
.wishlist-view .wv-header .wvh-item {
    width: 718px;
}
.wishlist-view .wv-items{
    width: 100%;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
/* */
@media only screen and (max-width: 768px) {
    .wishlist-view {
        width: 95%;
    }
}
</style>