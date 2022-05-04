<template>
  <div class="product-detail">
      <carousel :items=1 :nav="false" :dots="false" class="pd-images center">
          <img v-for='image in product.images' :key='image[".key"]' :src="image">
      </carousel>
      <div class="pd-info">
          <div class="pdi-title">
              <span>{{product.title}}</span>
          </div>
          <div class="pdi-rating" style='display:flex'>
              <star-rating :increment=0.1 :active-color='"orange"' :fixed-points=1 :padding=5 :star-size=17 v-model='product.rating.rate' :read-only='true'/>
              <span style='marginLeft:5px;fontSize:14px;color:grey'>({{product.rating.count}} reviews)</span>
          </div>
          <div class="pdi-des">
              <span>{{product.description}}</span>
          </div>
          <div class="pdi-price">
              <span>${{product.price}} <span style='color:orangered;textDecoration:line-through'>${{Math.floor(product.price+product.price*50/100)}}</span></span>
          </div>
          <div style='display:flex;alignItems:center' v-if='product.type=="keyboard"' class="pdi-switch">
              <span>Switch: </span>
              <div style='display:flex'>
                <div class='center' @click='kswitch="red"' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;backgroundColor:red;width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='kswitch=="red"' class="fas fa-check center"></i></div>
                <div class='center' @click='kswitch="blue"' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;backgroundColor:rgb(85, 136, 255);width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='kswitch=="blue"' class="fas fa-check center"></i></div>
                <div class='center' @click='kswitch="brown"' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;backgroundColor:brown;width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='kswitch=="brown"' class="fas fa-check center"></i></div>
              </div>
          </div>
          <span style='color:red;fontSize:13px;marginLeft:5px;padding:0' v-if='product.type=="keyboard"'>{{err1}}</span>
          <div style='display:flex;alignItems:center' class="pdi-color">
              <span>Color: </span>
              <div style='display:flex'>
                <div v-for='(clor) in product.color' :key='clor' class='center' @click='color=clor' :style='{backgroundColor:clor}' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='color==clor && clor!="whitesmoke"' class="fas fa-check center"></i><i style='color:black;fontWeight:bolder;' v-if='color==clor && clor=="whitesmoke"' class="fas fa-check center"></i></div>
              </div>
          </div>
          <span style='color:red;fontSize:13px;marginLeft:5px;;padding:0' v-if='product.type=="keyboard"'>{{err2}}</span>
          <div class="pdi-quantity center">
              <i @click='removeQty' class="fas fa-minus icon center"></i>
              <input disabled v-model="quantity" type="number">
              <i @click='addQty' class="fas fa-plus icon center"></i>
          </div>
          <div class="pdi-control">
              <div @click='addCart' class="pdic-cart">
                  <button class="btn btn-sm btn-dark center"><ion-icon style='fontSize:20px;marginRight:5px' name="cart-outline"></ion-icon> ADD TO CART</button>
              </div>
              <div @click='addWishlist' class="pdic-wishlist">
                  <button class="btn btn-sm btn-danger center"><ion-icon style='fontSize:20px;marginRight:5px' name="heart-outline"></ion-icon> WISHLIST</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel,StarRating},
    data() {
        return {
            kswitch:'',
            color:'',
            quantity:1,
            err1:'',
            err2:'',
        }
    },
    watch: {
        color(e) {
            if (e!='') {
                this.err2=''
            }
        },
        kswitch(e){
            if (e!='') {
                this.err1=''
            }
        }
    },
    methods: {
        addQty() {
            this.quantity++
        },
        removeQty() {
            this.quantity--
            if (this.quantity==0) {
                this.quantity=1
            }
        },
        addCart() {
            if (this.product.type=='keyboard') {
                if (this.kswitch=='') {
                    this.err1='Please select switch first.'
                }
                if (this.color=='') {
                    this.err2='Please select color first.'
                }
                if (this.err1!=''||this.err2!='') {
                    return
                }
            }
            if (this.color=='') {
                this.err2='Please select color first.'
                return
            }
            this.$bvModal.msgBoxConfirm(`Add this item to your cart ? (Quantity:${this.quantity})`,{
                    title: 'Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        let item
                        if (this.product.type=="keyboard") {
                            item={
                                key:this.product.key,
                                quantity:this.quantity,
                                kswitch:this.kswitch,
                                color:this.color
                            }
                        }
                        else {
                            item={
                                key:this.product.key,
                                quantity:this.quantity,
                                color:this.color
                            }
                        }
                        this.$store.dispatch('addCart',item)
                        this.reset()
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
        },
        addWishlist() {
            this.$bvModal.msgBoxConfirm('Add this item to your wishlist ?',{
                    title: 'Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        if(this.$store.state.cart.wishlist.find(item=>item.key==this.product.key)) {
                            return
                        }
                        else {
                            this.$store.dispatch('addWishlist',{key:this.product.key})
                        }
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
        }
    },
    props:{
        product:Object
    }
}
</script>

<style>
.product-detail {
    width: 100%;
    display: flex;
}
.product-detail .pd-images{
    width: 500px;
    height: 700px;
}
.product-detail .pd-images img{
    width: 100%;
    max-height: 700px;
    object-fit: contain;
    background-color: whitesmoke;
    cursor:-webkit-grab;
}
.product-detail .pd-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.product-detail .pd-info>div {
    padding:10px;
}
.product-detail .pd-info .pdi-quantity input{
    outline:none;
    border:none;
    border:1px solid gainsboro;
    width: 40px;
    padding:5px;
    height: 100%;
    text-align: center;
}
.product-detail .pd-info .pdi-quantity input::-webkit-outer-spin-button,
.product-detail .pd-info .pdi-quantity input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.product-detail .pd-info .pdi-quantity {
    width: 100px;
    height: 40px;
    justify-content: space-between;
}
.product-detail .pd-info .pdi-quantity .icon{
    width: 10px;
    height: 100%;
    font-size: 16px;
    padding:5px;
    cursor: pointer;
    transition:.1s linear;
}
.product-detail .pd-info .pdi-quantity .icon:hover{
    transform: scale(1.1);
}
.product-detail .pd-info .pdi-title {
    font-size: 28px;
    font-weight: bolder;
}
.product-detail .pd-info .pdi-des {
    font-size: 16px;
}
.product-detail .pd-info .pdi-price {
    font-weight: bolder;
    font-size: 21px;
}
.product-detail .pd-info .pdi-control {
    display: flex;
}
.product-detail .pd-info .pdi-control button{
    width: 140px;
    margin:0 5px;
    height: 40px;
}
/*  */
@media only screen and (max-width: 768px) {
    .product-detail {
        flex-direction: column;
    }
    .product-detail .pd-images{
        width: 95%;
        height: 400px;
        margin:0 auto;
    }
    .product-detail .pd-images img{
        width: 100%;
        max-height: 400px;
    }
}
@media only screen and (max-width: 425px) {
    .product-detail .pd-images{
        height: 300px;
    }
    .product-detail .pd-images img{
        width: 100%;
        max-height: 300px;
    }
    .product-detail .pd-info .pdi-title {
        font-size: 22px;
    }
    .product-detail .pd-info .pdi-des {
        font-size: 15px;
    }
    .product-detail .pd-info .pdi-price {
        font-size: 18px;
    }
    .product-detail .pd-info .pdi-control button {
        font-size: 12px;
        width: 130px;
    }
}
@media only screen and (max-width: 320px) {
    .product-detail .pd-images{
        height: 250px;
    }
    .product-detail .pd-images img{
        max-height: 250px;
    }
}
</style>