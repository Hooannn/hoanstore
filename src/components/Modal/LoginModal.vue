<template>
  <div @click='close_' class="login-modal center">
      <div class="lm-form">
          <span style='color:red;fontSize:14px'>{{err}}</span>
          <span style='color:green;fontSize:14px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)'>{{result}}</span>
          <ion-icon @click='close' onMouseOut='this.style.color="grey";this.style.transform="rotate(0) scale(1)"' onMouseOver='this.style.color="orange";this.style.transform="rotate(90deg) scale(1.07)"' style='transition:.3s linear;position:absolute;top:10px;right:10px;fontSize:30px;color:grey;cursor:pointer' name="close-circle-outline"></ion-icon>
          <div v-if='$store.state.user.email==null' class='lmf-title center' style='fontWeight:light;fontSize:20px;padding:10px 0'>Login</div>
          <input @keypress.enter="login" v-if='$store.state.user.email==null' v-model='email' placeholder="Your email address..." style='width:100%;padding:8px 10px;margin:8px 0;borderRadius:3px;fontSize:14px' type="email">
          <input @keypress.enter="login" v-if='$store.state.user.email==null' v-model='password' placeholder="Your password..." style='width:100%;padding:8px 10px;margin:8px 0;borderRadius:3px;fontSize:14px' type="password">
          <button v-if='$store.state.user.email==null' @click='login' onMouseOut='this.style.opacity="1"' onMouseOver='this.style.opacity="0.8"' style='backgroundColor:#17a2b8;border:none;outline:none;color:white;boxShadow:0 0 3px rgba(0,0,0,0.3);width:100%;borderRadius:200px;padding:5px 0;fontSize:15px'>Login</button>
          <div v-if='$store.state.user.email==null' style='fontSize:14px;color:grey;padding:10px 0'>or use a social network</div>
          <div v-if='$store.state.user.email==null' class='lmf-social'>
              <div class='center'><ion-icon name="logo-facebook"></ion-icon></div>
              <div class='center'><ion-icon name="logo-twitter"></ion-icon></div>
              <div class='center'><ion-icon name="logo-google"></ion-icon></div>
          </div>
          <div v-if='$store.state.user.email==null' class='center' style='position:absolute;bottom:30px;width:100%;fontSize:15px'>Not a member yet? <button @click='showSignupModal' onMouseOut='this.style.textDecoration="none"' onMouseOver='this.style.textDecoration="underline"' style=';textDecoration:none;outline:none;border:none;boxShadow:none;color:#17a2b8;padding:0;margin:0;marginLeft:5px' class="btn btn-link">Sign Up</button>.</div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            err:'',
            result:'',
            email:'',
            password:''
        }
    },
    watch: {
        email() {
            this.err=''
        },
        password() {
            this.err=''
        }
    },
    methods: {
        reset() {
            this.err=''
            this.result=''
            this.email=''
            this.password=''
        },
        close() {
            document.querySelector('#app>div.login-modal').classList.remove('show')
            this.reset()
        },
        showSignupModal() {
            this.close()
            setTimeout(() => {
                document.querySelector('#app>div.signup-modal').classList.toggle('show')
            }, 200);
        },
        close_(e) {
            if (e.target==document.querySelector('#app>div.login-modal')) {
                document.querySelector('#app>div.login-modal').classList.remove('show')
                this.reset()
            }
        },
        login() {
            this.$store.dispatch('loading')
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then((response) => {
                    if (this.$route.name!='home') {
                        this.$router.push({name:"home"})
                    }
                    this.$store.state.user=response.user
                    this.result='Login successfully.'
                    db.ref('billinformation').child(response.user.uid).child('email').get().then((res)=>{this.$store.state.cart.orderInformation.email=res.val()||''}).catch(()=>{return})
                    db.ref('billinformation').child(response.user.uid).child('phone').get().then((res)=>{this.$store.state.cart.orderInformation.phone=res.val()||''}).catch(()=>{return})
                    db.ref('billinformation').child(response.user.uid).child('address').get().then((res)=>{this.$store.state.cart.orderInformation.address=res.val()||''}).catch(()=>{return})
                    db.ref('billinformation').child(response.user.uid).child('name').get().then((res)=>{this.$store.state.cart.orderInformation.name=res.val()||''}).catch(()=>{return})
                    this.$store.dispatch('unload')
                })
                .catch(err=>{
                    this.err=err
                    this.$store.dispatch('unload')
                })
        }
    }
}
</script>

<style>
.login-modal {
    width: 100vw;
    height: 100vh;
    background-color:rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    z-index:1000;
    visibility: hidden;
    opacity: 0;
    transition: .3s linear;
}
.login-modal.show {
    visibility: visible;
    opacity: 1;
}
.login-modal .lm-form {
    position: relative;
    width: 325px;
    height: 400px;
    background-color:white;
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
    border-radius: 5px;
    padding:15px 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login-modal .lm-form input {
    border:none;
    outline:none;
    border:1px solid gainsboro;
}
.login-modal .lm-form input:focus {
    border-color: orange;
}
.login-modal .lm-form .lmf-social {
    display: flex;
}
.login-modal .lm-form .lmf-social div{
    width: 35px;
    height: 35px;
    background-color: #6c757d;
    margin:0 20px;
    border-radius: 35px;
    color:white;
    font-size: 20px;
    cursor: pointer;
    transition: .3s linear;
}
.login-modal .lm-form .lmf-social div:hover {
    transform: rotate(360deg) scale(0.93);
    background-color: orange;
}
</style>