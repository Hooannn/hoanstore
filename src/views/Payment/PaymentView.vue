<template>
  <div class="payment-view">
      <div class="first-col">
          <div class="pv-orders">
              <div class="pvo-title">
                  <span>ORDERS</span>
              </div>
              <order-detail/>
          </div>
          <payment-methods/>
      </div>
      <div class="second-col">
          <payment-user-info/>
      </div>
  </div>
</template>

<script>
import OrderDetail from '@/components/Payment/OrderDetail.vue'
import PaymentUserInfo from '@/components/Payment/PaymentUserInfo.vue'
import PaymentMethods from '@/components/Payment/PaymentMethods.vue'
export default {
  components: { OrderDetail, PaymentUserInfo, PaymentMethods },
}
</script>

<style>
.payment-view {
    width: 1280px;
    margin:0 auto;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.payment-view .first-col {
    margin-top: 25px;
    width: 49%;
    display: flex;
    flex-direction: column;
}
.payment-view .second-col {
    margin-top: 25px;
    width: 49%;
    display: flex;
    flex-direction: column;
}
/* 1 col */

.payment-view .first-col .pv-orders {
    background-color:rgba(255,255,255,0.7);
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    width: 100%;
    padding:15px 25px;
}   
.payment-view .first-col .pv-orders .pvo-title {
    height: 50px;
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid orange;
    display: flex;
    align-items: center;
}
/* 2 col */
</style>