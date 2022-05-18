<template>
  <div id="app">
    <bill-modal :key="'billmodal'+$store.state.app.billKey"/>
    <signup-modal/>
    <login-modal/>
    <cart-bar/>
    <wishlist-bar/>
    <loading-view/>
    <short-view-modal/>
    <noti-sale-modal/>
    <nav-bar/>
    <navigation-com :key='"navc"+$route.path' v-if="$route.name!='home'"/>
    <router-view :key='"main"+$route.fullPath+$store.state.app.sort'/>
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
import BillModal from './components/Modal/BillModal.vue'
export default {
  components: { NavBar, ShortViewModal, NotiSaleModal, FooterBar, NavigationCom, LoadingView, CartBar, WishlistBar,LoginModal, SignupModal, BillModal },
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
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	background-color: #313131;
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
  overflow-x:hidden;
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
