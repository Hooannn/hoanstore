<template>
  <div class="payment-methods">
    <span style='color:red;'>{{result}}</span>
    <div class="pm-title">
      <span>PAYMENT METHODS</span>
    </div>
    <div class="pm-form">
        <div style='padding:10px;'>
            <input @click="codMethod" type="radio" id="cod" name="group-radio" />
            <label style='marginLeft:5px;cursor:pointer' for="cod">COD</label>
        </div>
        <div style='padding:10px;'>
            <input :disabled='!isLogin' @click="cardMethod" type="radio" id="card" name="group-radio" />
            <label :class='{disabled:!isLogin}' style='marginLeft:5px;cursor:pointer' for="card">CARD PAYMENT</label>
            <br>
            <span style='fontSize:13px;color:red;'>{{err}}</span>
        </div>
    </div>
    <button @click='order' onMouseOut="this.style.backgroundColor='black'" onMouseOver="this.style.backgroundColor='rgba(0,0,0,0.8)'" style='margin:10px 0;border:none;outline:none;backgroundColor:black;color:white;padding:8px;'>
        ORDER
    </button>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            bill:{},
            method:'',
            err:'',
            result:'',
            isLogin:null
        }
    },
    watch: {
        method() {
            this.result=''
        }
    },
    computed: {
        ...mapGetters(['GET_CART','GET_BILLINFO','GET_SUBTOTAL','GET_UID','GET_BDES'])
    },
    methods:{
        codMethod() {
            this.method='cod'
        },
        cardMethod() {
            this.method='card'
        },
        order() {
            if (this.$store.state.cart.cart.length==0) {
                this.result="Your cart is empty." 
                return
            }
            if (this.checkEmptyInfo()) {
                this.result="Your information is missing."
                return
            }
            if (this.method=='') {
                this.result="Please choose your payment method."
                return
            }
            else {
                this.$bvModal.msgBoxConfirm(`Your cart subtotal is $${this.$store.state.cart.cartTotal}. Please check it carefully before order.`,{
                    title: 'Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle: 'Order',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        this.getBill()
                        setTimeout(this.orderSent(),100)
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
            }
        },
        checkEmptyInfo() {
            if (this.$store.state.cart.orderInformation.name==''||this.$store.state.cart.orderInformation.name.trim()=='') {
                return true
            }
            if (this.$store.state.cart.orderInformation.email==''||this.$store.state.cart.orderInformation.email.trim()=='') {
                return true
            }
            if (this.$store.state.cart.orderInformation.phone==''||this.$store.state.cart.orderInformation.phone.trim()=='') {
                return true
            }
            if (this.$store.state.cart.orderInformation.address==''||this.$store.state.cart.orderInformation.address.trim()=='') {
                return true
            }
        },
        getBill() {
            this.bill={
                items:this.GET_CART,
                billinfo:this.GET_BILLINFO,
                subtotal:this.GET_SUBTOTAL,
                method:this.method,
                des:this.GET_BDES
            }
        },
        orderSent() {
            this.$store.dispatch('loading')
            
            /*  */
            /* send bill */
            db.ref('bills').push({time:new Date().getTime(),date:new Date().toLocaleString(),uid:this.GET_UID||'user'}).then((res)=>{
                db.ref('bills').child(res.key).child('key').set(res.key)
                db.ref('bills').child(res.key).child('bill').set(this.bill).then(()=>{
                    this.$store.dispatch('unload')
                    this.$bvModal.msgBoxOk('Your order has been sent. Thanks you. Login if you want to manage your bill information.', {
                        title: 'Confirmation',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    })
                    .then(value => {
                        this.$store.state.cart.cart=[]
                        return
                    })
                    .catch(err => {
                        this.$store.dispatch('unload')
                        this.result=err
                        this.$store.state.cart.cart=[]
                        return
                    })
                })
            }).catch(err=>{
                this.result=err
                this.$store.dispatch('unload')
            })
        }
    },
    mounted() {
        this.isLogin=false
        if (this.$store.state.user.email!=null) {
            this.isLogin=true
        }
        if (this.isLogin==false) {
            this.err='Please login to add card information.'
        }
    }
}
</script>

<style>
input[type="radio"] { 
    display: none;
}
label {
    padding-left: 30px;
    position: relative;
    margin: 0;
    line-height: 20px;
}
label:before {
	 width: 20px;
	 height: 20px;
	 border-radius: 50%;
	 position: absolute;
	 top: 50%;
	 transform: translateY(-50%);
	 left: 0;
	 content: '';
	 background: #fff;
	 border: 1px solid orange;
}
input[type="radio"]:checked ~ label:after {
	 width: 12px;
	 height: 12px;
	 border-radius: 50%;
	 position: absolute;
	 top: 50%;
	 transform: translateY(-50%);
	 left: 4px;
	 content: '';
     background: orange;
}
input[type="radio"]:checked ~ label::before {
    border-color:orange;
}
label.disabled::before {
    border-color:grey;
    cursor:default;
}
label.disabled{
    color:grey;
}
.payment-methods {
  background-color:rgba(255,255,255,0.7);
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  width: 100%;
  padding:15px 25px;
  margin-top:25px;
}
.payment-methods .pm-title {
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid orange;
  display: flex;
  align-items: center;
}
.payment-methods .pm-form {
    display: flex;
    flex-direction: column;
}
</style>