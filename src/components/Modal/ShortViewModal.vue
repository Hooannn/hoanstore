<template>
    <div  @click='close_' class="short-view-product center">
        <!--  
        <div >
            Loading here
        </div>
        -->
        <div class="product-detail">
            <ion-icon @click='close' onMouseOver='this.style.transform="rotate(90deg)";this.style.color="orangered"' onMouseOut='this.style.transform="rotate(0)";this.style.color="unset"' style='cursor:pointer;transition:.3s linear;position:absolute;top:5px;right:5px;fontSize:30px;zIndex:5' name="close-circle-outline" class='close-icon'></ion-icon>
            <div class="pd-image center">
                <carousel :key='$store.state.product.key' class="pd-image-show center" :items=1 :nav="false" >
                    <img v-for='(img) in $store.state.product.images' :key='img' :src="img">
                </carousel>
            </div>
            <div class="pd-info">
                <div style='fontWeight:bolder;fontSize:20px' class='pd-info-title'>{{$store.state.product.title}}</div>
                <div class='pd-info-rating'>
                    <star-rating :increment=0.1 :active-color='"orange"' :fixed-points=1 :padding=5 :star-size=17 v-model='$store.state.product.rating.rate' :read-only='true'/>
                    <span style='marginLeft:5px;fontSize:14px;color:grey'>({{$store.state.product.rating.count}} reviews)</span>
                </div>
                <div style='fontWeight:bolder;fontSize:19px' class='pd-info-price'>${{$store.state.product.price}} <span style='color:orangered;textDecoration:line-through'>${{Math.floor($store.state.product.price+$store.state.product.price*50/100)}}</span></div>
                <div style='color:grey' class='pd-info-description'>{{$store.state.product.description}}</div>
                <div class='pd-info-switch' v-if='$store.state.product.type=="keyboard"'>
                    <span>Switch: </span>
                    <div>
                        <div class='center' @click='kswitch="red"' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;backgroundColor:red;width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='kswitch=="red"' class="fas fa-check center"></i></div>
                        <div class='center' @click='kswitch="blue"' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;backgroundColor:rgb(85, 136, 255);width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='kswitch=="blue"' class="fas fa-check center"></i></div>
                        <div class='center' @click='kswitch="brown"' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;backgroundColor:brown;width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='kswitch=="brown"' class="fas fa-check center"></i></div>
                    </div>
                </div>
                <div class='pd-info-color'>
                    <span>Color</span>
                    <div>
                        <div v-for='(clor) in $store.state.product.color' :key='clor' class='center' @click='color=clor' :style='{backgroundColor:clor}' style='boxShadow:1px 1px 1px rgba(0,0,0,0.5);fontSize:20px;cursor:pointer;borderRadius:3px;width:30px;height:30px;margin:0 5px'><i style='color:white;fontWeight:bolder;' v-if='color==clor && clor!="whitesmoke"' class="fas fa-check center"></i><i style='color:black;fontWeight:bolder;' v-if='color==clor && clor=="whitesmoke"' class="fas fa-check center"></i></div>
                    </div>
                </div>
                <div class='quantity-select center'>
                    <i @click='removeQty' class="fas fa-minus icon center"></i>
                    <input disabled v-model="quantity" type="number">
                    <i @click='addQty' class="fas fa-plus icon center"></i>
                </div>
                <div >
                    <button style='width:110px;margin:0 5px' class="btn btn-sm btn-dark">ADD TO CART</button>
                    <button style='width:100px;margin:0 5px' class="btn btn-sm btn-danger">WISHLIST</button>
                </div>
                <div class='pd-info-share'>
                    <span>Share:</span>
                    <div class='center'><ion-icon class='icon' style='color:#4267b2' name="logo-facebook"></ion-icon></div>
                    <div class='center'><ion-icon class='icon' style='color:#CD486B' name="logo-instagram"></ion-icon></div>
                    <div class='center'><ion-icon class='icon' style='color:#1DA1F2' name="logo-twitter"></ion-icon></div>
                    <div class='center'><ion-icon class='icon' style='color:black' name="logo-tiktok"></ion-icon></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import StarRating from 'vue-star-rating'
import store from '@/store/store'
export default {
    components:{StarRating,carousel},
    data() {
        return {
            quantity:1,
            kswitch:'',
            color:''
        }
    },
    methods:{
        close_(e) {
            let modal=document.querySelector('#app > div.short-view-product')
            if (e.target==modal) {
                modal.classList.remove('show')
                store.state.product=null
            }
        },
        close() {
            let modal=document.querySelector('#app > div.short-view-product.show')
            modal.classList.remove('show')
        },
        addQty() {
            this.quantity++
        },
        removeQty() {
            this.quantity--
            if (this.quantity==0) {
                this.quantity=1
            }
        }
    },
}
</script>

<style>
.short-view-product.show {
    visibility: visible;
    opacity: 1;
}
.short-view-product {
    width: 100vw;
    min-height:100vh;
    height: auto;
    background-color:rgba(0,0,0,0.6);
    position: fixed;
    top:0;
    left:0;
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition: .2s linear;
}
.short-view-product .product-detail{
    width: 900px;
    height: 500px;
    background-color:white;
    border-radius: 3px;
    box-shadow: 0 0 1px rgba(0,0,0,0.1);
    position: relative;
    display: flex;
}
.short-view-product .product-detail .pd-image{
    width: 40%;
    height: 100%;
}
.short-view-product .product-detail .pd-image .pd-image-show{
    width: 100%;
    height: 100%;
    padding:10px;
}
.short-view-product .product-detail .pd-image .pd-image-show img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color:rgb(240, 241, 241);
}
.short-view-product .product-detail .pd-info{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.short-view-product .product-detail .pd-info>*{
    padding:5px 0;
    margin:5px 0;
}
.short-view-product .product-detail .pd-info .pd-info-rating{
    display: flex;
    align-items: center;
}
.short-view-product .product-detail .pd-info .pd-info-switch{
    display: flex;
    align-items: center;
}
.short-view-product .product-detail .pd-info .pd-info-switch>div{
    display: flex;
}
.short-view-product .product-detail .pd-info .pd-info-color{
    display: flex;
    align-items: center;
}
.short-view-product .product-detail .pd-info .pd-info-color>div{
    display: flex;
}
.short-view-product .product-detail .pd-info .quantity-select input{
    outline:none;
    border:none;
    border:1px solid gainsboro;
    width: 40px;
    padding:5px;
    height: 100%;
    text-align: center;
}
.short-view-product .product-detail .pd-info .quantity-select input::-webkit-outer-spin-button,
.short-view-product .product-detail .pd-info .quantity-select input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.short-view-product .product-detail .pd-info .quantity-select {
    width: 100px;
    height: 40px;
    justify-content: space-between;
}
.short-view-product .product-detail .pd-info .quantity-select .icon{
    width: 10px;
    height: 100%;
    font-size: 16px;
    padding:5px;
    cursor: pointer;
    transition:.1s linear;
}
.short-view-product .product-detail .pd-info .quantity-select .icon:hover{
    transform: scale(1.1);
}
.short-view-product .product-detail .pd-info .pd-info-share {
    height: 35px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left:0;
}
.short-view-product .product-detail .pd-info .pd-info-share div{
    margin:0 5px;
    font-size: 20px;
}
.short-view-product .product-detail .pd-info .pd-info-share div .icon:hover{
    transform: scale(1.1);
    cursor: pointer;
}

/*  */
@media only screen and (max-height: 500px) {
    .short-view-product .product-detail {
        width: 100vw;
        height: 100vh;
        overflow-y: auto;
    }
    .short-view-product .product-detail .pd-info .pd-info-share {
        position: relative;
    }
}
@media only screen and (max-width: 768px) {
    .short-view-product .product-detail {
        width: 100vw;
        height: 100vh;
        flex-direction: column;
        overflow-y: auto;
    }
    .short-view-product .product-detail .pd-image {
        width: 60%;
        margin:0 auto;
    }
    .short-view-product .product-detail .pd-info {
        width: 50%;
        margin:0 auto;
    }
    .short-view-product .product-detail .pd-info .pd-info-share {
        position: relative;
    }
}
@media only screen and (max-width: 425px) {
    .short-view-product .product-detail .pd-info {
        width: 100%;
    }
}
</style>