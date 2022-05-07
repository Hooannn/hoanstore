<template>
  <div @click='close_' class="signup-modal center">
      <div class="sm-form">
          <span style='color:red;fontSize:14px'>{{err}}</span>
          <span style='color:green;fontSize:14px'>{{result}}</span>
          <ion-icon @click='close' onMouseOut='this.style.color="grey";this.style.transform="rotate(0) scale(1)"' onMouseOver='this.style.color="orange";this.style.transform="rotate(90deg) scale(1.07)"' style='transition:.3s linear;position:absolute;top:10px;right:10px;fontSize:30px;color:grey;cursor:pointer' name="close-circle-outline"></ion-icon>
          <div class='smf-title center' style='fontWeight:light;fontSize:20px;padding:10px 0'>Sign Up</div>
          <input @keypress.enter="signup" v-model='email' placeholder="Your email address..." style='width:100%;padding:8px 10px;margin:8px 0;borderRadius:3px;fontSize:14px' type="email">
          <input @keypress.enter="signup" v-model='password' placeholder="Your password..." style='width:100%;padding:8px 10px;margin:8px 0;borderRadius:3px;fontSize:14px' type="password">
          <input @keypress.enter="signup" v-model='password2' placeholder="Confirm your password..." style='width:100%;padding:8px 10px;margin:8px 0;borderRadius:3px;fontSize:14px' type="password">
          <button @click='signup' onMouseOut='this.style.opacity="1"' onMouseOver='this.style.opacity="0.8"' style='backgroundColor:#17a2b8;border:none;outline:none;color:white;boxShadow:0 0 3px rgba(0,0,0,0.3);width:100%;borderRadius:200px;padding:5px 0;fontSize:15px'>Sign up</button>
          <div class='center' style='position:absolute;bottom:30px;width:100%;fontSize:15px'>Already has an account? <button @click='showLoginModal' onMouseOut='this.style.textDecoration="none"' onMouseOver='this.style.textDecoration="underline"' style=';textDecoration:none;outline:none;border:none;boxShadow:none;color:#17a2b8;padding:0;margin:0;marginLeft:5px' class="btn btn-link">Login</button>.</div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
    data() {
        return {
            err:'',
            result:'',
            email:'',
            password:'',
            password2:''
        }
    },
    watch: {
        email(e) {
            if (e!='') {
                this.err=''
                this.result=''
            }
        },
        password(e) {
            if (e!='') {
                this.err=''
                this.result=''
            }
        },
        password2(e) {
            if (e!='') {
                this.err=''
                this.result=''
            }
        }
    },
    methods: {
        close() {
            document.querySelector('#app>div.signup-modal').classList.remove('show')
            this.reset()
            this.err=''
            this.result=''
        },
        close_(e) {
            if (e.target==document.querySelector('#app>div.signup-modal')) {
                document.querySelector('#app>div.signup-modal').classList.remove('show')
                this.reset()
                this.err=''
                this.result=''
            }
        },
        showLoginModal() {
            this.close()
            setTimeout(() => {
                document.querySelector('#app>div.login-modal').classList.toggle('show')
            }, 200);
        },
        confirmPassword() {
            if (this.password!=this.password2) {
                this.reset()
                this.err='Error: Your password does not match.'
                return false
            }
            else if (this.password==this.password2) {
                return true
            }
        },
        reset() {
            this.email=''
            this.password=''
            this.password2=''
        },
        signup() {
            if (this.confirmPassword()) {
                this.$store.dispatch('loading')
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then((response) => {
                        this.reset()
                        this.result='Sign up successfully'
                        this.$store.dispatch('unload')
                    })
                    .catch(err=>{
                        this.reset()
                        this.err=err
                        this.$store.dispatch('unload')
                    })
            }
            else {
                return
            }
        }
    }
}
</script>

<style>
.signup-modal {
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
.signup-modal.show {
    visibility: visible;
    opacity: 1;
}
.signup-modal .sm-form {
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
.signup-modal .sm-form input {
    border:none;
    outline:none;
    border:1px solid gainsboro;
}
.signup-modal .sm-form input:focus {
    border-color: orange;
}

</style>