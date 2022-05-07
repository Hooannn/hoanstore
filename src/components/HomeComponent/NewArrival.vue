<template>
  <div class="new-arrival">
      <div class="na-title">
          <span style='padding:0 10px;backgroundColor:orangered;fontWeight:bolder;color:white'>NEW</span>
      </div>
      <div class="na-content">
          <div class="nac-info">
              <div class="nav-info-price">
                  <div>${{product.price}} <span style='color:red;textDecoration:line-through'>${{Math.floor(product.price+product.price*50/100)}}</span></div>
              </div>
              <div class="nav-info-title">
                  <span>{{product.title}}</span>
              </div>
              <div class="nav-info-description">
                  <span>{{product.description}}</span>
              </div>
              <div class="nav-info-control">
                  <div style='display:flex;flexDirection:column;alignItems:center;justifyContent:space-around'>
                      <div @click='addCart' class='center'><ion-icon class='center' name="cart-outline"></ion-icon></div>
                      <span>BUY NOW</span>
                  </div>
                  <div style='display:flex;flexDirection:column;alignItems:center;justifyContent:space-around'>
                      <div @click='addWishlist' class='center'><ion-icon class='center' name="heart-outline"></ion-icon></div>
                      <span>WISHLIST</span>
                  </div>
                  <div style='display:flex;flexDirection:column;alignItems:center;justifyContent:space-around'>
                      <div @click='quickView' class='center'><ion-icon class='center' name="eye-outline"></ion-icon></div>
                      <span >QUICK VIEW</span>
                  </div>
              </div>
          </div>
          <carousel :dots="false" :autoplay="true" :nav="false" :items=1 class="nac-images">
              <img v-for='image in images' :key='image[".key"]' :src="image['.value']">
          </carousel>
      </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import db from '@/plugins/firebase'
export default {
    components: {carousel},
    firebase:{
        product:db.ref('products').child('arrival'),
        images:db.ref('products').child('arrival').child('images')
    },
    data() {
        return {
            product:{},
            images:[],
        }
    },
    methods:{
        quickView() {
            this.$store.state.product=this.product
            setTimeout(function(){
                let modal=document.querySelector('#app > div.short-view-product.center')
                modal.classList.add('show')
            },100)
        },
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
        }
    }
}
</script>

<style>
.sec-4 .new-arrival {
    height: auto;
    width: 100%;
    background-color: rgb(245, 245, 245,0.5);
}
.sec-4 .new-arrival .na-title{
    height: 30px;
    display: flex;
    align-items: center;
}
.sec-4 .new-arrival .na-title span{
    font-size: 30px;
}
.sec-4 .new-arrival .na-content {
    height: 470px;
    width: 100%;
    display: flex;
}
.sec-4 .new-arrival .na-content .nac-info {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}
.sec-4 .new-arrival .na-content .nac-images {
    width: 50%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sec-4 .new-arrival .na-content .nac-images img {
    width: 88%;
    height: 100%;
    object-fit: cover;
    margin:0 auto;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-price{
    position:absolute;
    top:0;
    right:0;
    padding:5px 10px;
    font-size:17px;
    box-shadow:1px 1px 2px rgba(0,0,0,0.5);
    background-color:orange;
    border-radius:5px;
    font-weight:bolder;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-title{
    font-size: 40px;
    font-weight: light;
    color:orangered;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-description {
    font-size: 20px;
    font-weight: lighter;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-control {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100px;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-control div div{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:white;
    font-size: 30px;
    color:orange;
    cursor: pointer;
    box-shadow: 0 0 1px rgb(0, 0, 0,0.5);
    transition:.2s linear;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-control div div:hover {
    background-color:orange;
    color:white;
}
.sec-4 .new-arrival .na-content .nac-info .nav-info-control div span {
    color:orange;
    font-weight: light;
    transition:.2s linear;
}
/*  */
@media only screen and (max-width: 768px) {
    .sec-4 .new-arrival .na-content {
        flex-direction: column;
        height: auto;
    }
    .sec-4 .new-arrival .na-content .nac-info,.sec-4 .new-arrival .na-content .nac-images {
        width: 100%;
        margin:0 auto;
    }
    .sec-4 .new-arrival .na-content .nac-images {
        max-height: auto;
        overflow: visible;
    }
    .sec-4 .new-arrival .na-content .nac-images img {
        width: 60%;
        object-fit: cover;
        margin:0 auto;
    }
    .sec-4 .new-arrival .na-content .nac-info .nav-info-price{
        font-size:14px;
        position: relative;
    }
    .sec-4 .new-arrival .na-content .nac-info .nav-info-title{
        font-size: 27px;
    }
    .sec-4 .new-arrival .na-content .nac-info .nav-info-description {
        font-size: 17px;
    }
    .sec-4 .new-arrival .na-title span{
        font-size: 20px;
    }
}
</style>