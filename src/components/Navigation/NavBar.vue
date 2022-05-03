<template>
  <div class="nav-bar center">
      <div class="content">
          <div class="brand">
            <img class='brand-icon' :src="icon">
            <div class='brand-name'>
              <div style='color:orangered;fontWeight:800;'>hoanthui's Store</div>
              <div style='fontWeight:bolder;fontStyle:italic;'>Enjoy your shopping</div>
            </div>
          </div>
          <div class="home center">
              <span @click='$router.push({name:"home"})' :class='{selected:$route.name=="home"}'>HOME</span> <!-- <ion-icon class='ion-icon' name="chevron-down-outline"></ion-icon> -->
          </div>
          <div class="shop center">
              <span @click='$router.push({name:"shop",params:{page:1}})'>SHOP</span> <!-- <ion-icon class='ion-icon' name="chevron-down-outline"></ion-icon> -->
          </div>
          <div @mouseover="slide" @mouseout="unslide" style='height:100%' class="about center">
              <span>ABOUT</span><ion-icon class='ion-icon' name="chevron-down-outline"></ion-icon>
              <div class='drop-down'>
                  <div>
                      <span>Contact</span>
                      <span>Products</span>
                      <span>Features</span>
                  </div>
                  <div style='width:150px;height:100px;overflow:hidden;padding:15px;'>
                      <img style='width:100%;height:100%;objectFit:cover;borderRadius:15px' src="https://allfetch.com/wp-content/uploads/2021/04/introduce-your-online-store.jpeg">
                  </div>
              </div>
          </div>
          <div class="login-account center">
              <button class="btn btn-dark btn-sm"><span>LOGIN</span></button> <!-- <ion-icon class='ion-icon' name="chevron-down-outline"></ion-icon> -->
          </div>
          <div class="nav-control">
              <div style='position:relative' class="wish-list">
                  <div v-if='$store.state.cart.wishlist.length>0' style='height:17px;width:17px;position:absolute;right:-5px;bottom:3px;backgroundColor:orange;color:white;borderRadius:50%;fontSize:11px;zIndex:5' class="quantity center">{{$store.state.cart.wishlist.length}}</div>
                  <ion-icon class='ion-icon' name="heart-outline"></ion-icon>
              </div>
              <div style='position:relative' class="cart">
                  <div v-if='$store.state.cart.cart.length>0' style='height:17px;width:17px;position:absolute;right:-5px;bottom:3px;backgroundColor:orange;color:white;borderRadius:50%;fontSize:11px;zIndex:5' class="quantity center">{{$store.state.cart.cart.length}}</div>
                  <ion-icon @click='showCart' class='ion-icon' name="cart-outline"></ion-icon>
              </div>
              <div class="search">
                  <ion-icon class='ion-icon' name="search-outline"></ion-icon>
              </div>
              <div class="nav-mobile">
                  <span @click='showNav' class='nb-icon'><ion-icon class='ion-icon' name="menu"></ion-icon></span>
                  <div @click='closeNavMobile_' class="nb-cover">
                      <div class="nb-content">
                      <div @click='closeNavMobile' class='nb-back center'><ion-icon name="arrow-back-outline"></ion-icon></div>
                      <div @click='$router.push({name:"home"})' :class='{selected:$route.name=="home"}' class="nb-home">HOME</div>
                      <div @click='$router.push({name:"shop",params:{page:1}})' :class='{selected:$route.name=="shop"}' class="nb-shop">SHOP</div>
                      <div class="nb-about">ABOUT <span class='center' style='fontSize:20px'><ion-icon name="chevron-forward"></ion-icon></span></div>
                      <div class="nb-login"><button style='margin:10px auto' class="btn btn-sm btn-light">LOGIN</button></div>
                      <div class="nb-account">
                          <!-- unlogin -->
                          <div class="default-account center">
                              <div style='fontSize:30px' class='da-avatar center'>
                                  <ion-icon name="person-circle"></ion-icon>
                              </div>
                              <div class='da-info center' style='flexDirection:column'>
                                  <span>User</span>
                              </div>
                          </div>
                          <!-- is login -->
                          <!--                           
                          <div class="account">

                          </div> 
                          -->
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import icon from '@/assets/Icon/store-2.png'
export default {
    data() {
        return {
            icon:icon
        }
    },
    methods: {
        showCart() {
            let cart=document.querySelector('#app > div.cart-bar')
            let cartC=document.querySelector('#app > div.cart-bar > div.cb-content')
            cart.classList.toggle('show')
            cartC.classList.toggle('show')
        },
        closeNavMobile() {
            let cover=document.querySelector('.nav-bar .nav-control .nav-mobile .nb-cover')
            let nav=document.querySelector('.nav-bar .nav-control .nav-mobile .nb-cover .nb-content')
            nav.classList.remove('show')
            setTimeout(function(){
                cover.classList.remove('show')
            },300)
        },
        closeNavMobile_(e) {
            let cover=document.querySelector('.nav-bar .nav-control .nav-mobile .nb-cover')
            let nav=document.querySelector('.nav-bar .nav-control .nav-mobile .nb-cover .nb-content')
            if (e.target==cover) {
                nav.classList.remove('show')
                setTimeout(function(){
                    cover.classList.remove('show')
                },300)
            }
        },
        showNav() {
            let cover=document.querySelector('.nav-bar .nav-control .nav-mobile .nb-cover')
            cover.classList.toggle('show')
            let nav=document.querySelector('.nav-bar .nav-control .nav-mobile .nb-cover .nb-content')
            nav.classList.toggle('show')
        },
        slide() {
            let dropDown=document.querySelector('.nav-bar .content .about .drop-down')
            let title=document.querySelector('.nav-bar .content .about>span')
            let icon=document.querySelector('.nav-bar .content .about>.ion-icon')
            dropDown.style.animation='slide-down .5s linear'
            dropDown.style.visibility='visible'
            dropDown.style.display='flex'
            title.style.color='orangered'
            icon.style.color='orangered'
        },
        unslide() {
            let title=document.querySelector('.nav-bar .content .about>span')
            let icon=document.querySelector('.nav-bar .content .about>.ion-icon')
            let dropDown=document.querySelector('.nav-bar .content .about .drop-down')
            dropDown.style.display='none'
            title.style.color='black'
            icon.style.color='black'
        }
    }
}
</script>

<style>
.nav-bar {
    position: fixed;
    width: 1280px;
    height: 60px;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    background-color:white;
    z-index: 200;
}
.nav-bar .ion-icon {
    font-weight: bold;
    font-size: 20px;
}
.nav-bar .nav-control .ion-icon {
    font-weight: bold;
    font-size: 25px;
    cursor: pointer;
    transition:.2s linear;
}
.nav-bar .nav-control .ion-icon:hover {
    color:orange;
}
.nav-bar .content{
    width: 1080px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 15px;
}
.nav-bar .content>div:not(.nav-control){
    cursor: pointer;
}
/* 
.nav-bar .content>div.about:hover .drop-down{
    visibility: visible;
    animation:slide-down .5s linear;
} */
.nav-bar .content .brand {
    display: flex;
    align-items: center;
    height: 100%;
}
.nav-bar .content .brand .brand-name {
    margin-left: 5px;
    font-family: cursive;
}
.nav-bar .content .brand .brand-name {
    font-size: 20px;
}
.nav-bar .content .brand .brand-icon {
    width: 50px;
    height: 50px;
}
.nav-bar .content .nav-control{
    display: flex;
    justify-content: space-between;
    width: 200px;
}
.nav-bar .content .about .drop-down {
    display: flex;
    position: absolute;
    height: 100px;
    align-items: center;
    top:100%;
    background-color: whitesmoke;
    padding:0 20px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.5);
    transform-style: preserve-3d;
    visibility: hidden;
}
@keyframes slide-down {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
.nav-bar .content .about .drop-down div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    padding:5px;
}
.nav-bar .content .about .drop-down div span{
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: all .2s linear;
}
.nav-bar .content>div>span:hover{
    color:orangered;
}
.nav-bar .content>div>span.selected{
    color:orangered;
}
.nav-bar .content .about .drop-down div span:hover{
    color:orange;
    transform: translateX(3px);
}
/* nav for mobile  */
.nav-bar .nav-control .nav-mobile {
    display: none;
}
.nav-bar .nav-control .nav-mobile .nb-cover.show {
    visibility: visible;
    opacity: 1;
}
.nav-bar .nav-control .nav-mobile .nb-cover{
    width: 100vw;
    height: 100vh;
    background-color:rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    visibility: hidden;
    opacity: 0;
    z-index: 15;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-content.show {
    height: 100vh;
    width: 320px;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-content{
    position: absolute;
    top:0;
    right: 0;
    width: 0;
    height: 0;
    background-color: #313131;
    color:white;
    z-index: 10;
    transition:.3s linear;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-back {
    cursor: pointer;
    width: 100%;
    font-size: 17px;
    padding:0 10px;
    height: 25px;
    background-color:black;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-back:hover {
    background-color:white;
    color:black;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-home,.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-shop,.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-about,.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-login {
    font-weight: lighter;
    font-size: 13px;
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 10px;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-home.selected,.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-shop.selected,.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-about.selected {
    border-left: 5px solid orange;
    background-color: rgb(0, 0, 0,0.3);
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-account{
    background-color:rgb(255,255,255,0.3);
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    height:37px;
    font-weight: lighter;
}
.nav-bar .nav-control .nav-mobile .nb-cover .nb-content .nb-account .default-account {
    width: 100%;
    height: 100%;
}
/*  */
@media only screen and (min-width: 1280px) {
    .nav-bar {
        width: 100vw;
    }
}
@media only screen and (max-width: 1190px) {
    .nav-bar {
        width: 100vw;
        height: 50px;
    }
    .nav-bar .content {
        justify-content: space-around;
    }
}
@media only screen and (max-width: 768px) {
    .nav-bar .content .home,.nav-bar .content .shop,.nav-bar .content .about,.nav-bar .content .login-account {
        display: none;
    }
    .nav-bar {
        width: 100vw;
        height: 50px;
    }
    .nav-bar .content {
        justify-content: space-around;
    }
    .nav-bar .content .brand .brand-name{
        font-size: 15px;
    }
    .nav-bar .content .brand .brand-icon{
        width: 35px;
        height: 35px;
    }
    .nav-bar .content .nav-control{
        width: 250px;
    }
    .nav-bar .nav-control .ion-icon {
        font-size: 20px;
    }
    .nav-bar .content .nav-control .nav-mobile{
        display: block;
    }
}
@media only screen and (max-width: 425px) {
    .nav-bar .content .brand .brand-name{
        display: none;
    }
}
</style>