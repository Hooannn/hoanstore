<template>
  <div class="home-view">
    <carousel @changed="onChanged" :autoplaySpeed=1100 :autoHeight="true" :dots="false" :autoplay="true" :nav="false" :items=1 class="sec-1">
        <template slot="prev"><span class="prev"><ion-icon style='color:orange;zIndex:50;fontSize:30px' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
        <div  class="product-intro-1">
            <div :key='key1' class='sales-intro'>
                <h1 >FESTIVAL SALE</h1>
                <h4 >Up to 50%</h4>
                <button class="btn btn btn-light">Shop now</button>
            </div>
            <img src="https://wallpaperaccess.com/full/4525282.jpg" >
        </div>
        <div class="product-intro-2">
            <div :key='key2' class='sales-intro'>
                <h1 style='color:orange'>NEW COLLECTIONS</h1>
                <h5 style='fontStyle:italic'>With high quality</h5>
                <button class="btn btn btn-light">Shop now</button>
            </div>
            <img src="https://wallpaperaccess.com/full/7069726.jpg" >
        </div>
        <div class="product-intro-3">
            <div :key='key3' class='sales-intro'>
                <h1 >TRENDING</h1><h1 style='color:black'>GEAR</h1>
                <button class="btn btn btn-light">Shop now</button>
            </div>
            <img src="https://wallpaperaccess.com/full/903122.jpg" >
        </div>
        <div class="product-intro-4">
            <div :key='key4' class='sales-intro'>
                <h1 style='color:orangered'>VISIT OUR STORE </h1>
                <h4 style='color:white'>NOW</h4>
                <button class="btn btn btn-light">Shop now</button>
            </div>
            <img src="https://wallpaperaccess.com/full/5270765.jpg" >
        </div>
        <template slot="next"><span class="next"><ion-icon style='color:orange;zIndex:50;fontSize:30px' class='next-icon' name="chevron-forward-circle-outline"></ion-icon></span></template>
    </carousel>
    <div class="sec-2">
        <div class="speaker-intro">
            <div class="text">
                <h3>Speaker</h3>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel autem dicta eos nostrum,
                     architecto facilis totam voluptatem nisi fuga omnis eius perspiciatis placeat corrupti minus iusto! Soluta quidem repellendus nemo.
                </div>
                <button class="btn btn-sm btn-dark">Shop now</button>
            </div>
            <div class="image">
                <img style='width:100%;height:100%;' src="https://www.pngall.com/wp-content/uploads/4/Portable-Speaker-PNG-HD-Image.png">
            </div>
        </div>
        <div class="gear-intro">
            <div class="keyboard-intro">
                <div class="text">
                    <h3>Keyboard</h3>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel autem dicta eos nostrum,
                        architecto facilis
                    </div>
                    <button class="btn btn-sm btn-dark">Shop now</button>
                </div>
                <div class="image">
                    <img style='width:100%;height:100%;' src="https://imgkub.com/images/2022/04/30/images-removebg-preview-1.png">
                </div>
            </div>
            <div class="mouse-intro">
                <div class="text">
                    <h3>Mouse</h3>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel autem dicta eos nostrum,
                        architecto facilis
                    </div>
                    <button class="btn btn-sm btn-dark">Shop now</button>
                </div>
                <div class="image">
                    <img style='width:100%;height:100%;' src="https://imgkub.com/images/2022/04/30/images-removebg-preview-2.png">
                </div>
            </div>
        </div>
        <button style='height:40px;margin:15px auto;' class="btn btn-dark btn-sm">See more</button>
        <div class="store-offer">
            <div class='offer'>
                <i class="fas fa-shipping-fast center"></i>
                <div class='offer-detail'>
                    <span style='fontWeight:bolder'>Free Shipping</span>
                    <span style='fontWeight:light;fontSize:14px'>On all orders over $100</span>
                </div>
            </div>
            <div class='offer'>
                <i class="fas fa-exchange-alt center"></i>
                <div class='offer-detail'>
                    <span style='fontWeight:bolder'>Free Returns</span>
                    <span style='fontWeight:light;fontSize:14px'>Returns are free within 9 days</span>
                </div>
            </div>
            <div class='offer'>
                <i class="fas fa-shield-alt center"></i>
                <div class='offer-detail'>
                    <span style='fontWeight:bolder'>100% Payment Secure</span>
                    <span style='fontWeight:light;fontSize:14px'>Your payment are safe with us.</span>
                </div>
            </div>
            <div class='offer'>
                <i class="fas fa-headset center"></i>
                <div class='offer-detail'>
                    <span style='fontWeight:bolder'>Support 24/7</span>
                    <span style='fontWeight:light;fontSize:14px'>Contact us 24 hours a day</span>
                </div>
            </div>
        </div>
    </div>
    <div class="sec-3">
        <top-product/>
    </div>
  </div>
</template>

<script>
import TopProduct from '@/components/HomeComponent/TopProduct.vue'
import carousel from 'vue-owl-carousel'
export default {
    components: { carousel,TopProduct },
    data() {
        return {
            key1:1,
            key2:2,
            key3:3,
            key4:4,
        }
    },
    methods: {
        onChanged(e) {
            this.key1++
            this.key2++
            this.key3++
            this.key4++
        }
    },
}
</script>

<style>
.home-view .sec-2 .text *{
    margin:5px 0;
}
.home-view .sec-2 .text h3 {
    font-weight: bold;
}
.home-view .sec-2 .text div {
    font-weight: light;
    font-size: 15px;
}
.home-view {
    width: 100%;
    padding-top:60px;
    display: flex;
    flex-direction: column;
}
/* sec-1 */
.home-view div.sec-1 {
    width:1280px;
    height: 700px;
    position: relative;
}
.home-view div.sec-1:hover .next-icon {
    visibility: visible;
    animation: move-right 0.5s ease-in-out forwards;
}
.home-view div.sec-1:hover .previous-icon {
    visibility: visible;
    animation: move-left 0.5s ease-in-out forwards;
}
.home-view div.sec-1 .next-icon,.home-view div.sec-1 .previous-icon{
    cursor: pointer;
    visibility: hidden;
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}
.home-view div.sec-1 .previous-icon {
    left:15px;
}
.home-view div.sec-1 .next-icon{
    right:15px;
}
.home-view div.sec-1 div.product-intro-1,.home-view div.sec-1 div.product-intro-2,.home-view div.sec-1 div.product-intro-3,.home-view div.sec-1 div.product-intro-4{
    min-width:100vw;
    height: 700px;
}
.home-view div.sec-1 div.product-intro-1 img,.home-view div.sec-1 div.product-intro-2 img,.home-view div.sec-1 div.product-intro-3 img,.home-view div.sec-1 div.product-intro-4 img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.home-view div.sec-1>div div.sales-intro h1 {
    font-size: 50px;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
.home-view div.sec-1>div div.sales-intro h4 {
    font-weight: lighter;
    font-size: 35px;
    font-family: cursive;
    color:orangered;
}
.home-view div.sec-1>div div.sales-intro {
    position:absolute;
    color:white;
    top:35%;
    left:100px;
    animation:slide-up 2s ease-in-out;
    visibility: visible;
}
.home-view div.sec-1>div div.sales-intro.show {
    animation:slide-up 1s ease-in-out;
    visibility: hidden;
}
@keyframes slide-up {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes move-left {
    0% {
        transform: translate(0,-50%);
    }
    100% {
        transform: translate(-15px,-50%)
    }
}
@keyframes move-right {
    0% {
        transform: translate(0,-50%);
    }
    100% {
        transform: translate(15px,-50%)
    }
}
/* sec-2 */
.home-view div.sec-2 {
    margin:0 auto;
    margin-top:100px;
    width: 1280px;
    height: 750px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
 /* speaker 1 col 1 row*/
.home-view div.sec-2 .speaker-intro{
    width: 48%;
    max-height: 520px;
    background-color: rgb(245, 245, 245,0.5);
    display: flex;
    cursor: pointer;
    overflow-y: auto;
    text-overflow: ellipsis;
}
.home-view div.sec-2 .speaker-intro:hover .text, .home-view div.sec-2 .speaker-intro:hover .image{
    transform: scale(1.07);
}
.home-view div.sec-2 .speaker-intro .text,.home-view div.sec-2 .speaker-intro .image{
    width: 50%;
    height: 100%;
    padding:30px;
    transition: .4s linear;
}
 /* gear 2 col 1 row */
.home-view div.sec-2 .gear-intro{
    width: 48%;
    height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.home-view div.sec-2 .gear-intro .keyboard-intro{
    width: 100%;
    max-height: 250px;
    background-color: rgb(245, 245, 245,0.5);
    display: flex;
    overflow-y: auto;
    text-overflow: ellipsis;
    cursor: pointer;
}
.home-view div.sec-2 .gear-intro .keyboard-intro:hover .text, .home-view div.sec-2 .gear-intro .keyboard-intro:hover .image{
    transform: scale(1.07);
}
.home-view div.sec-2 .gear-intro .mouse-intro{
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    text-overflow: ellipsis;
    background-color: rgb(245, 245, 245,0.5);
    display: flex;
    cursor: pointer;
}
.home-view div.sec-2 .gear-intro .mouse-intro:hover .text, .home-view div.sec-2 .gear-intro .mouse-intro:hover .image{
    transform: scale(1.07);
}
.home-view div.sec-2 .gear-intro .keyboard-intro .text,.home-view div.sec-2 .gear-intro .keyboard-intro .image,
.home-view div.sec-2 .gear-intro .mouse-intro .text,.home-view div.sec-2 .gear-intro .mouse-intro .image {
    width: 50%;
    height: 100%;
    padding:30px;
    transition: .4s linear;
}
.home-view div.sec-2 .gear-intro .keyboard-intro .image img, .home-view div.sec-2 .gear-intro .mouse-intro .image img,.home-view div.sec-2 .speaker-intro .image img {
    object-fit: cover;
}
/*  */
 /* store-offer 2 row */
.home-view div.sec-2 .store-offer{
    width: 100%;
    height: 130px;
    background-color: rgb(245, 245, 245,0.5);
    display: flex;
}
.home-view div.sec-2 .store-offer .offer {
    display: flex;
    align-items: center;
    width: 25%;
    height: 100%;
}
.home-view div.sec-2 .store-offer .offer i {
    width: 20%;
    font-size: 30px;
}
.home-view div.sec-2 .store-offer .offer .offer-detail{
    display: flex;
    flex-direction: column;
    width: 80%;
}
/* sec-3 */
.home-view div.sec-3 {
    margin:0 auto;
    margin-top:100px;
    width: 1280px;
    height: 430px;
}

/*  */
@media only screen and (min-width: 1280px) {
    .home-view div.sec-1 {
        width: 100vw;
    }
}
@media only screen and (max-width: 1280px) {
    .home-view, .home-view div.sec-1, .home-view div.sec-2, .home-view div.sec-3 {
        width: 100vw;
        height: auto;
    }
}
@media only screen and (max-width: 768px) {
    .home-view {
        padding-top: 50px;
    }
    .home-view, .home-view div.sec-1, .home-view div.sec-2, .home-view div.sec-3 {
        width: 100vw;
        height: auto;
    }
    .home-view div.sec-2, .home-view div.sec-3 {
        margin-top: 40px;
    }
    .home-view div.sec-1 {
        height: 400px;
    }
    .home-view div.sec-1 div.product-intro-1,.home-view div.sec-1 div.product-intro-2,.home-view div.sec-1 div.product-intro-3,.home-view div.sec-1 div.product-intro-4{
        height: 400px;
    }
    .home-view div.sec-1 div div.sales-intro h1 {
        font-size: 30px;
    }
    .home-view div.sec-1 div div.sales-intro h4 {
        font-size: 20px;
    }
    .home-view div.sec-1>div div.sales-intro {
        top:30%;
        left:50px;
    }
    /* sec -2 */
    .home-view div.sec-2 .gear-intro, .home-view div.sec-2 .speaker-intro{
        width: 100%;
    }
    .home-view div.sec-2 .store-offer {
        flex-direction: column;
        height: auto;
    }
    .home-view div.sec-2 .store-offer .offer{
        width: 50%;
        display: flex;
        text-align: center;
        margin: 10px auto;
    }
    .home-view div.sec-2 .gear-intro .keyboard-intro .image img, .home-view div.sec-2 .gear-intro .mouse-intro .image img,.home-view div.sec-2 .speaker-intro .image img {
        object-fit: contain;
    }
    .home-view div.sec-2 .gear-intro .keyboard-intro .text h3, .home-view div.sec-2 .gear-intro .mouse-intro .text h3,.home-view div.sec-2 .speaker-intro .text h3{
        font-size: 17px;
    }
    .home-view div.sec-2 .gear-intro .keyboard-intro .text div, .home-view div.sec-2 .gear-intro .mouse-intro .text div,.home-view div.sec-2 .speaker-intro .text div{
        font-size: 14px;
    }
}
</style>