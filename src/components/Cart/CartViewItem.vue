<template>
  <div class="cart-view-item">
      <div class="cvi-id center">
          {{id}}
      </div>
      <div class="cvi-item">
        <div class="cvii-image">
            <img style='width:100%;height:100%;objectFit:cover' :src="item.image">
        </div>
        <div class="cvii-title center">
            <span>{{item.title}}</span>
        </div>
        <div class="cvii-option">
            <div style='display:flex;justifyContent:space-between;margin:10px 0' v-if='product.type=="keyboard"' class='cviio-kswitch center'>
                <span>Switch: </span>
                <select @change="switchChange" style='width:75px;border:none;outline:none;border:1px solid gainsboro' v-model='kswitch'>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Brown</option>
                </select>
            </div>
            <div style='display:flex;justifyContent:space-between;margin:10px 0' class='cviio-color center'>
                <span>Color: </span>
                <select @change="colorChange" style='width:75px;border:none;outline:none;border:1px solid gainsboro' v-model='color'>
                    <option v-for='(color,index) in product.color' :key='"color"+index'>{{color|upperFirstCase}}</option>
                </select>
            </div>
        </div>
        <div style='flexDirection:column' class="cvii-quantity center">
            <div class='center' style='width:100%;justifyContent:space-between;margin:5px 0'>
                <input @change="quantityChange" min=1 type="number" v-model='quantity'>
                <span style='fontWeight:bold'>x ${{item.price}}</span>
            </div>
            <div class='center' style='width:100%;margin:5px 0'>
                <span >Total:</span> 
                <span style='fontWeight:bolder;color:orangered;fontSize:16px;marginLeft:5px'> ${{total}}</span>
            </div>
        </div>
        <div class="cvii-delete center">
            <ion-icon @click='removeItem' onMouseOut='this.style.transform="scale(1)"' onMouseOver='this.style.transform="scale(1.1)"' style='cursor:pointer' class='icon' name="trash-outline"></ion-icon>
        </div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    props:{
        item:Object,
        id:Number
    },
    filters:{
        upperFirstCase(string) {
            if (string) {
                return string[0].toUpperCase() + string.substring(1)
            }
        }
    },
    methods: {
        removeItem() {
            this.$bvModal.msgBoxConfirm(`Remove this item from your cart ?`,{
                    title: 'Remove',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Remove',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        this.$store.state.cart.cart.splice((this.id-1),1)
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
        },
        switchChange() {
            let newSwitch=this.kswitch.toLowerCase()
            this.$store.state.cart.cart[this.id-1].kswitch=newSwitch
            this.$store.state.cart.rstKey=new Date().getTime()
        },
        colorChange() {
            let newColor=this.color.toLowerCase()
            this.$store.state.cart.cart[this.id-1].color=newColor
            this.$store.state.cart.rstKey=new Date().getTime()
        },
        quantityChange() {
            this.$store.state.cart.cart[this.id-1].quantity=parseInt(this.quantity,10)
            this.$store.state.cart.rstKey=new Date().getTime()
        }
    },
    data() {
        return {
            product:{},
            color:'',
            kswitch:'',
            quantity:1,
            total:''
        }
    },
    watch: {
        quantity(e) {
            this.total=e*this.product.price
        }
    },
    mounted() {
        this.$rtdbBind('product',db.ref('products').child(this.item.key))
        this.color=this.item.color[0].toUpperCase() + this.item.color.substring(1)
        this.quantity=this.item.quantity
        this.total=this.quantity*this.product.price
        if (this.item.kswitch[0]) {
            this.kswitch=this.item.kswitch[0].toUpperCase() + this.item.kswitch.substring(1)
        }
    }
}
</script>

<style>
.cart-view-item {
    width: 100%;
    border-bottom: 1px solid gainsboro;
    display: flex;
}
.cart-view-item .cvi-id {
    width: 50px;
    border-right: 1px solid gainsboro;
}
.cart-view-item .cvi-item {
    display:flex;
    align-items: center;
    width: 718px;
    justify-content: space-between;
}
.cart-view-item .cvi-item .cvii-image {
    width: 120px;
    height: 120px;
}
.cart-view-item .cvi-item .cvii-title {
    font-weight: bolder;
    font-size: 16px;
    width: 200px;
    margin:10px 0;
}
.cart-view-item .cvi-item .cvii-option {
    width: 130px;
    margin:10px 0;
    font-size: 15px;
}
.cart-view-item .cvi-item .cvii-delete {
    width: 50px;
    font-size: 20px;
    margin:10px 0;
    color:orangered;
}
.cart-view-item .cvi-item .cvii-quantity {
    font-size: 15px;
    width: 120px;
    display: flex;
    margin:10px 0;
    justify-content: space-between;
}
.cart-view-item .cvi-item .cvii-quantity div input{
    outline:none;
    border:none;
    border:1px solid gainsboro;
    width: 40px;
}
.cart-view-item .cvi-item .cvii-quantity div input:focus {
    border-color: orange;
}

/*  */ 
@media only screen and (max-width: 768px) {
    .cart-view-item .cvi-item {
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>