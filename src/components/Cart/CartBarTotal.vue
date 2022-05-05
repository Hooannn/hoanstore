<template>
  <div class="cart-bar-total">
    <div style='fontWeight:bolder;padding:0 10px;'>TOTAL:</div>
    <div style='padding:0 10px;color:orangered;fontSize:19px'>${{subtotal}}</div> 
  </div>
</template>

<script>
export default {
    data() {
        return {
            subtotal:0
        }
    },
    mounted() {
        this.$store.state.cart.cart.forEach(item => {
            if (item.quantity&&item.price) {
                this.subtotal+=item.quantity*item.price
            }
        });
        this.$store.state.cart.cartTotal=this.subtotal
    }
}
</script>

<style>

</style>