<template>
  <div style='cursor:pointer' @click='viewDetail' class="shop-product">
      <carousel :items=1 :nav="false" :dots="true" class="sp-images center">
          <img v-for='image in product.images' :key='image[".key"]' :src="image">
      </carousel>
      <div class="sp-detail">
          <span class='spd-title'>{{product.title}}</span>
          <span class='spd-des'>{{product.description}}</span>
          <span class='spd-price'>${{product.price}} <span style='color:orangered;textDecoration:line-through;fontWeight:bolder;fontSize:18px'>${{Math.floor(product.price+product.price*50/100)}}</span></span>
          <div class='spd-control'>
              <div @click='addWishlist' class='spdc-wishlist'>
                  <button class="btn btn-sm btn-danger center"><ion-icon class='icon' style='fontSize:20px;marginRight:5px;pointerEvents:none' name="heart-outline"></ion-icon> WISHLIST</button>
              </div>
              <div @click='addCart' class='spdc-cart'>
                  <button class="btn btn-sm btn-dark center"><ion-icon class='icon' style='fontSize:20px;marginRight:5px;pointerEvents:none' name="cart-outline"></ion-icon> ADD TO CART</button>
              </div>    
              <div @click='quickView' class='spdc-qview center'>
                  <ion-icon style=';pointerEvents:none' name="eye-outline"></ion-icon>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel},
    props:{
        product:Object
    },
    data() {
        return {

        }
    },
    methods: {
        addCart() {
            this.$bvModal.msgBoxConfirm('Add this item to your cart ?',{
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
                        this.$store.dispatch('addCart',{key:this.product.key})
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
        },
        viewDetail(e) {
            let c=document.querySelector(`div.shop-product.${this.product.key} > div.sp-detail > div`)
            let a=document.querySelector(`div.shop-product.${this.product.key} > div.sp-detail > div > div.spdc-cart>button`)
            let b=document.querySelector(`div.shop-product.${this.product.key} > div.sp-detail > div > div.spdc-wishlist>button`)
            let d=document.querySelector(`div.shop-product.${this.product.key} > div.sp-detail > div > div.spdc-qview`)
            if (e.target==a||e.target==b||e.target==c||e.target==d) {
                return
            }
            this.$router.push({name:'product',params:{key:this.product.key}})
        },
        quickView() {
            this.$store.state.product=this.product
            setTimeout(function(){
                let modal=document.querySelector('#app > div.short-view-product.center')
                modal.classList.add('show')
            },100)
        }
    },
    mounted() {

    }
}
</script>

<style>
.shop-product {
    display: flex;
    height: 400px;
    margin:25px 0;
}
.shop-product .sp-images {
    width: 300px;
    height: 400px;
}
.shop-product .sp-images img {
    width: 100%;
    object-fit: contain;
    max-height: 500px;
    cursor: grab;
}
.shop-product .sp-detail {
    width: 468px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    max-width: 468px;
}
.shop-product .sp-detail .spd-title{
    font-size: 22px;
    font-weight: bolder;
    padding:10px;
    border-bottom: 1px solid grey;
}
.shop-product .sp-detail .spd-des{
    padding:10px;
    max-width: 230px;
    overflow-y:auto;
}
.shop-product .sp-detail .spd-price{
    padding:10px;
    font-size: 18px;
}
.shop-product .sp-detail .spd-control{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top:25px;
}
.shop-product .sp-detail .spd-control div button {
    width: 140px;
}
.shop-product .sp-detail .spd-control .spdc-qview {
    font-size: 25px;
    cursor: pointer;
}
.shop-product .sp-detail .spd-control .spdc-qview:hover {
    color:orange;
}
@media only screen and (max-width: 768px) {
    .shop-product .sp-images {
        width: 250px;
        height: 400px;
    }
}
@media only screen and (max-width: 580px) {
    .shop-product {
        width: 100vw;
        justify-content: center;
    }
    .shop-product .sp-detail {
        max-width: 175px;
    }
    .shop-product .sp-detail .spd-control {
        flex-direction: column;
    }
    .shop-product .sp-detail .spd-control div{
        margin:5px 0;
    }
    .shop-product .sp-detail .spd-control div button{
        width: 140px;
    }
}
@media only screen and (max-width: 425px) {
    .shop-product .sp-images {
        width: 200px;
        height: 400px;
    }
    .shop-product .sp-detail .spd-title {
        font-size: 16px;
    }
    .shop-product .sp-detail .spd-des{
        font-size: 14px;
    }
    .shop-product .sp-detail .spd-price {
        font-size: 15px;
    }
    .shop-product .sp-detail .spd-control div button {
        width: 100px;
        font-size: 12px;
    }
    .shop-product .sp-detail .spd-control div button .icon{
        display: none;
    }
}
@media only screen and (max-width: 320px) {
    .shop-product .sp-images {
        width: 150px;
    }
    .shop-product .sp-detail .spd-title {
        font-size: 15px;
    }
    .shop-product .sp-detail .spd-des{
        font-size: 13px;
    }
    .shop-product .sp-detail .spd-price {
        font-size: 14px;
    }
    .shop-product .sp-detail .spd-control div button {
        width: 85px;
        font-size: 10px;
    }
    .shop-product {
        margin:15px 0;
    }
}
</style>