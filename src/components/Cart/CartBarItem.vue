<template>
  <div class="cart-bar-item">
      <div class="cbi-image">
        <img style='width:100%;height:100%;objectFit:cover' :src="cartItem.image">
      </div>
      <div class="cbi-detail">
        <div class="cbid-title">{{cartItem.title}}</div>
        <div class="cbid-des">
          <span v-if='product.type=="keyboard"'>( Switch : {{cartItem.kswitch|upperFirstCase}}, </span>
            <span>Color : {{cartItem.color|upperFirstCase}} <span v-if='product.type=="keyboard"'>)</span></span>
        </div>
        <div class="cbid-price">
          <span>{{cartItem.quantity}} x <span style='color:orangered;fontWeight:bolder'>${{product.price}}</span></span>
        </div>
      </div>
      <div class="cbi-delete center">
        <ion-icon @click='removeItem' class='icon' name="trash-outline"></ion-icon>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
  props:{
    item:Object,
    index:Number,
  },
  data() {
    return {
      product:{},
      cartItem:{},
    }
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
                        this.$store.state.cart.cart.splice(this.index,1)
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
      //let cbi=document.querySelector(`#app > div.cart-bar.show > div > div.cbc-items > div.cart-bar-item.cbi${this.index}`)
      //cbi.remove()
    }
  },
  mounted() {
    this.$rtdbBind('product',db.ref('products').child(this.item.key))
      this.cartItem.image=this.product.images[0]
      this.cartItem.price=this.product.price
      this.cartItem.title=this.product.title
      this.cartItem.color=this.item.color
      this.cartItem.kswitch=this.item.kswitch
      this.cartItem.quantity=this.item.quantity
      if (this.product.type=='keyboard') {
        if (!this.item.kswitch) {
          this.cartItem.kswitch='red'
        }
        if (!this.item.quantity) {
          this.cartItem.quantity=1
        }
        if (!this.item.color) {
          this.cartItem.color=this.product.color[0]
        }
      }
      else {
        if (!this.item.quantity) {
          this.cartItem.quantity=1
        }
        if (!this.item.color) {
          this.cartItem.color=this.product.color[0]
        }
      }
      this.$store.state.cart.cart[this.index].quantity=this.cartItem.quantity
      this.$store.state.cart.cart[this.index].title=this.cartItem.title
      this.$store.state.cart.cart[this.index].kswitch=this.cartItem.kswitch||"none"
      this.$store.state.cart.cart[this.index].color=this.cartItem.color
      this.$store.state.cart.cart[this.index].price=this.cartItem.price
      this.$store.state.cart.cart[this.index].image=this.cartItem.image
  }
}
</script>

<style>
.cart-bar-item {
  width: 320px;
  height: 100px;
  display: flex;
  margin:2.5px 0;
}
.cart-bar-item .cbi-image {
  height: 100%;
  width: 100px;
  background-color: aliceblue;
}
.cart-bar-item .cbi-detail {
  width: 175px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart-bar-item .cbi-detail .cbid-title{
  font-size: 17px;
  font-weight: bolder;
}
.cart-bar-item .cbi-detail .cbid-des {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: light;
  color:rgb(87, 86, 86);
}
.cart-bar-item .cbi-delete {
  width: 45px;
  height: 100%;
}
.cart-bar-item .cbi-delete .icon {
  font-size: 20px;
  color:orangered;
  cursor: pointer;
  transition: .1s linear;
}
.cart-bar-item .cbi-delete .icon:hover {
  transform: scale(1.1);
}
</style>