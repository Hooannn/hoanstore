<template>
  <div id="app">
    <signup-modal/>
    <login-modal/>
    <cart-bar/>
    <wishlist-bar/>
    <toastes-container/>
    <loading-view/>
    <short-view-modal/>
    <noti-sale-modal/>
    <nav-bar/>
    <navigation-com :key='"navc"+$route.path' v-if="$route.name!='home'"/>
    <router-view :key='"main"+$route.fullPath'/>
    <footer-bar/>
  </div>
</template>

<script>
import LoginModal from '@/components/Modal/LoginModal.vue'
import ShortViewModal from '@/components/Modal/ShortViewModal.vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import NotiSaleModal from './components/Modal/NotiSaleModal.vue'
import FooterBar from './components/Navigation/FooterBar.vue'
import NavigationCom from './components/Navigation/NavigationCom.vue'
import LoadingView from './views/LoadingView.vue'
import CartBar from './components/Cart/CartBar.vue'
import WishlistBar from './components/Wishlist/WishlistBar.vue'
import SignupModal from './components/Modal/SignupModal.vue'
export default {
  components: { NavBar, ShortViewModal, NotiSaleModal, FooterBar, NavigationCom, LoadingView, CartBar, WishlistBar,LoginModal, SignupModal },
  /*
  watch:{
    '$store.state.cart.cart'() {
      this.$store.state.cart.cart.forEach((item,index) => {
        localStorage.setItem(`item${index}`,JSON.stringify(item))
      });
    }
  },
  created() {
    for (let index = 0; index < localStorage.length-1; index++) {
      this.$store.state.cart.cart.push(JSON.parse(localStorage.getItem(`item${index}`)))      
    }
  }
  */
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@200;400&display=swap');
/*  scroll bar style */
::-webkit-scrollbar{
  display:none;
}
/*  scroll bar style */
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  box-sizing: content-box;
  font-family: "Poppins", sans-serif;
  user-select: none;
  background-color: rgba(229, 240, 248, 0.904);
}
body > div.nanobar .bar {
  background:orange;
}
.modal-backdrop {
  background-color:rgba(0,0,0,0.4);
}
#app {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  position: relative;
}
a {
  text-decoration: none;
  color: unset;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding:5px;
}
/*  */
@media only screen and (max-width: 768px) {
  body {
    max-width: 100vh;
    max-height: 100vh;
  }
  #app {
    max-width: 100vh;
    max-height: 100vh;
  }
}
/*  */

/*  */
</style>
