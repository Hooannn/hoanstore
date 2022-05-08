<template>
  <div class="bill-list">
      <div class="bl-title">YOUR BILL</div>
      <div v-for='(bill,index) in bills' :key='"bill"+bill.key' class="bl-bill">
        <div class="blb-id center">
          {{index+1}}
        </div>
        <div class="blb-detail center">
          <span style='fontWeight:bold'>{{bill.key}}</span>
          <span style='fontSize:14px;color:grey'>{{bill.date}}</span>
          <span style='fontSize:14px'>Cost: <span style='color:orangered;fontWeight:bold'>${{bill.bill.subtotal}}</span></span>
          <ion-icon @click='showBillModal(bill.key)' onMouseOut='this.style.color="gray"' onMouseOver='this.style.color="orangered"' style='transition:.2s linear;color:gray;position:absolute;right:5px;fontSize:18px;cursor:pointer' name="eye-outline"></ion-icon>
        </div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
  data() {
    return {
      data:[],
      bills:[]
    }
  },
  watch: {
    data() {
      this.bills=[]
      this.data.forEach(e => {
        if (e.uid==this.$store.state.user.uid) {
          this.bills.unshift(e)
        }
      });
    }
  },
  methods: {
    showBillModal(key) {
      this.$store.state.app.billKey=key
      setTimeout(function(){
        let billModal=document.querySelector('#app>div.bill-modal')
        billModal.classList.add('show')
      },100)
    }
  },
  mounted() {
    this.$rtdbBind('data',db.ref('bills'))
  }
}
</script>

<style>
.bill-list {
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  max-height: 700px;
  overflow-y:auto;
}
.bill-list .bl-title {
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid orange;
  display: flex;
  align-items: center;
}
.bill-list .bl-bill {
  width: 100%;
  display: flex;
  border-bottom: 2px solid black;
}
.bill-list .bl-bill .blb-id {
  width: 50px;
  border-right: 2px solid gainsboro;
  padding:5px 0;
}
.bill-list .bl-bill .blb-detail {
  padding:5px 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>  