<template>
  <div class="account-password">
    <div class="ap-title">CHANGE PASSWORD</div>
    <div style='margin:15px 0' class="ap-info">
      <span style='color:red;fontSize:14px'>{{err}}</span>
      <span style='color:green;fontSize:14px'>{{result}}</span>
      <div class="adi-newpw">
        <div style="padding: 5px; fontSize: 18px">NEW PASSWORD</div>
        <input
          v-model="newPW"
          placeholder="New password*"
          type="password"
        />
      </div>
      <div class="adi-newpwc">
        <div style="padding: 5px; fontSize: 18px">CONFIRM NEW PASSWORD</div>
        <input
          v-model="newPWC"
          placeholder="Confirm new password*"
          type="password"
        />
      </div>
      <button :disabled='!isChanged' @click='saveChange' style='marginTop:15px;' class="btn btn-sm btn-danger">Save</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
    data() {
        return {
            isChanged:false, 
            newPW:null,
            newPWC:null,
            err:'',
            result:'',
        }
    },
    watch: {
        newPW(e) {
            if (e==null || e.trim()=='') {
                this.isChanged=false
            } 
            else {
                this.isChanged=true
                this.err=''
                this.result=''
            }
        },
        newPWC(e) {
            if (e==null || e.trim()=='') {
                this.isChanged=false
            } 
            else {
                this.isChanged=true
                this.err=''
                this.result=''
            }
        }
    },
    methods: {
        checkMatchPW() {
            if (this.newPW!=this.newPWC) {
                this.err='Error: Your password does not match.'
                return false
            }
            else if (this.newPW==this.newPWC) {
                return true
            }
        },
        saveChange() {
            if (this.checkMatchPW()) {
                this.$store.dispatch('loading')
                firebase.auth().currentUser.updatePassword(this.newPW).then(() => {
                    this.newPW=''
                    this.newPWC=''
                    this.result='Save change successfully.'
                    this.$store.dispatch('unload')
                }).catch((error) => {
                    this.newPW=''
                    this.newPWC=''
                    this.err=error
                    this.$store.dispatch('unload')
                });
            }
            else  {
                return
            }
        }
    },
    mounted() {

    }
};
</script>

<style>
.account-password { 
  margin-top:25px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 15px 25px;
}
.account-password .ap-title {
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid orange;
  display: flex;
  align-items: center;
}
.account-password .ap-info div input{
  width: 100%;
  padding:8px 10px;
  font-size: 15px;
  border:none;
  outline:none;
  border:1px solid gainsboro;
  border-radius: 5px;
}
.account-password .ap-info div input:focus {
    border-color:orange;
}
</style>
