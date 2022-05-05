<template>
  <div class="pw-user-info">
    <div class="pwui-title">
      <span>INFORMATIONS</span>
    </div>
    <div class="pwui-form">
        <div class="pwuif-name">
          <div style='padding:5px;fontSize:18px'>FULL NAME</div>
          <input v-model='$store.state.cart.orderInformation.name' placeholder="Name*" type="text">
        </div>
        <div class="pwuif-phone">
          <div style='padding:5px;fontSize:18px'>PHONE</div>
          <input v-model='$store.state.cart.orderInformation.phone' placeholder="Phone*" type="text">
        </div>
        <div class="pwuif-email">
          <div style='padding:5px;fontSize:18px'>EMAIL ADDRESS</div>
          <input v-model='$store.state.cart.orderInformation.email' placeholder="Email*" type="email">
        </div>
        <div class="pwuif-address">
          <div style='padding:5px;fontSize:18px'>FULL ADDRESS</div>
          <input v-model='$store.state.cart.orderInformation.address' placeholder="Address*" type="text">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  watch: {
    '$store.state.cart.orderInformation.phone'(e) {
      if (isNaN(e)) {
        this.$store.state.cart.orderInformation.phone=''
      }
    }
  }
}
</script>

<style>
.pw-user-info {
  background-color:rgba(255,255,255,0.7);
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  width: 100%;
  padding:15px 25px;
  height: 100%;
}
.pw-user-info .pwui-title {
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid orange;
  display: flex;
  align-items: center;
}
.pw-user-info .pwui-form {
  margin-top:15px;
}
.pw-user-info .pwui-form div input{
  width: 100%;
  padding:8px 10px;
  font-size: 15px;
  border:none;
  outline:none;
  border:1px solid gainsboro;
  border-radius: 5px;
}
</style>