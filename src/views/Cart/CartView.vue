<template>
  <div class="cart-view">
      <div v-if='$store.state.cart.cart.length==0'>
          It seem your cart is empty. <span @click='$router.push({name:"shop",params:{page:1}})' style='cursor:pointer' onMouseOut='this.style.color="black"' onMouseOver='this.style.color="blue"'>Go to shop ?</span>
      </div>
      <div v-if='$store.state.cart.cart.length>0' class="cv-header">
          <div class='cvh-id center'>
              <span>ID</span>
          </div>
          <div class='cvh-item center'>
              <span>ITEM</span>
          </div>
      </div>
      <div v-if='$store.state.cart.cart.length>0' :key='"cvi"+$store.state.cart.cart.length' class="cv-items">
        <cart-view-item v-for='(item,index) in $store.state.cart.cart' :key='"cvi"+index' :item='item' :id='(index+1)'/>
      </div>
      <div v-if='$store.state.cart.cart.length>0' class='cv-confirm' style='display:flex;justifyContent:space-between'>
          <div class="cart-description">
            <div class="cd-title center">
              <span>CART DESCRIPTION</span>
            </div>
            <div class="cd-body center">
              <textarea v-model="$store.state.cart.description" placeholder="More description..." style='border:none;outline:none'></textarea>
            </div>
          </div>
          <div class="cart-total">
            <div class="ct-header center">
              <span>CART TOTAL</span>
            </div>
          <div class="ct-body center" style='justifyContent:space-between'>
              <div style='fontSize:16px;padding:10px;fontWeight:bold'>TOTAL COST: </div>
              <div style='fontSize:16px;padding:10px;fontWeight:bold;color:orangered'>${{$store.state.cart.cartTotal}}</div>
          </div>
          <button @click='$router.push({name:"payment"})' onMouseOut='this.style.backgroundColor="orangered"' onMouseOver='this.style.backgroundColor="rgb(255, 68, 0, 0.8)"' style='transition:.2s linear;boxShadow:0 0 3px rgba(0,0,0,0.5);border:none;outline:none;backgroundColor:orangered;color:white;width:235px;height:40px;margin:10px auto' class='center'>
              {{submit}} 
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import CartViewItem from '@/components/Cart/CartViewItem.vue'
export default {
  components: { CartViewItem },
  data() {
      return {
          total:0,
          submit:`CONFIRM & GO TO PAYMENT`,
      }
  },
  /*
  methods: {
      changeDes(e) {
          this.$store.state.cart.description=e
      }
  },
  */
  mounted() {

  }
}
</script>

<style>
.cart-view {
    width: 768px;
    margin:50px auto;
    display: flex;
    flex-direction: column;
    position: relative;
}
.cart-view .cv-header{
    width: 100%;
    height: 50px;
    background-color: orange;
    display: flex;
    color:white;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
.cart-view .cv-header .cvh-id{
    width: 50px;
    border-radius: 2px solid black;
}
.cart-view .cv-header .cvh-item {
    width: 718px;
}
.cart-view .cv-items{
    width: 100%;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
.cart-view .cv-confirm {
    margin-top:25px;
    display: flex;
    justify-content: space-between;
}
.cart-view .cart-total {
    width: 320px;
    top:100%;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    background-color:white;
}
.cart-view .cart-total .ct-header {
    color:white;
    background-color: orange;
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
}
.cart-view .cart-total .ct-body {
    width: 100%;
}
.cart-view .cart-description {
    width: 320px;
    top:100%;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    background-color:white;
}
.cart-view .cart-description .cd-title{
    color:white;
    background-color: orange;
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
}
.cart-view .cart-description .cd-body textarea {
  width: 100%;
  background-color: transparent;
  resize: none;
  background: none;
  padding:10px;
  font-size: 14px;
  height: 90px;
}
/* */
@media only screen and (max-width: 768px) {
    .cart-view {
        width: 95%;
    }
    .cart-view .cv-confirm {
        flex-direction: column;
    }
    .cart-view .cart-description,.cart-view .cart-total {
        width: 100%;
    }
    .cart-view .cart-total {
        margin-top:25px;
    }
}
</style>