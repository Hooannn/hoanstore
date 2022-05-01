<template>
  <div class="top-product-item">
      <div class="tpi-control">
          <div class='center'>
              <ion-icon name="heart"></ion-icon>
          </div>
          <div class='center'>
              <ion-icon name="cart"></ion-icon>
          </div>
          <div @click='shortView' class='center'>
              <ion-icon name="eye"></ion-icon>
          </div>
      </div>
      
      <!-- <div class="tpi-image">
          <img :src="product.image">
      </div> -->
      <carousel :autoplaySpeed=1100 :items=1 :nav="false" :dots="false" :autoplay="true" class="tpi-image">
          <img v-for='image in product.images' :key='image[".key"]' :src="image">
      </carousel>
      <div style='flexDirection:column' class="tpi-short-info center">
          <div style='cursor:pointer;fontWeight:bolder;fontSize:18px' class="tpi-title">
              {{product.title}}
          </div>
          <div style='color:grey;' class="tpi-price">
              ${{product.price}}
              <span style='color:orangered;textDecoration:line-through;fontWeight:bold'>${{Math.floor(product.price+product.price*50/100)}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel},
    props:{
        product:Object,
    },
    data() {
        return {
            
        }
    },
    methods: {
        shortView() {
            this.$store.state.product=this.product
            setTimeout(function(){
                let modal=document.querySelector('#app > div.short-view-product.center')
                modal.classList.add('show')
            },100)
        }
    },
}
</script>

<style>
.sec-3 .top-product .top-product-items .top-product-item {
    width: 280px;
    height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
}
.sec-3 .top-product .top-product-items .top-product-item:hover .tpi-control{
    transform: translateY(-75px);
    opacity: 1;
    visibility: visible;
}
.sec-3 .top-product .top-product-items .top-product-item .tpi-control{
    background-color: white;
    box-shadow: 1px 1px 2px rgb(0, 0, 0,0.3);
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top:250px;
    visibility: hidden;
    opacity: 0;
    transition: .3s linear;
    border-radius: 5px;
    z-index: 500;
}
.sec-3 .top-product .top-product-items .top-product-item .tpi-control>div{
    box-shadow: 2px 2px 1px rgb(0, 0, 0,0.1);
    padding:15px;
    height: 40px;
    cursor: pointer;
    border-radius: 5px;
    transition: .2s ease-in-out;
    font-size: 20px;
}
.sec-3 .top-product .top-product-items .top-product-item .tpi-control>div:hover{
    background-color:orange;
    color:white;
    box-shadow: none;
}
.sec-3 .top-product .top-product-items .top-product-item .tpi-image{
    width: 250px;
    height: 250px;
    overflow: hidden;
    background-color: rgb(255, 255, 255,0.3);
    box-shadow: 0 0 1px 0.5px gainsboro;
    cursor: pointer;
}
.sec-3 .top-product .top-product-items .top-product-item .tpi-image img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
/* tpi detail */
</style>