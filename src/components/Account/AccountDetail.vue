<template>
  <div class="account-detail">
    <div class="ad-title">ACCOUNT INFORMATION</div>
    <div style='margin:15px 0' class="ad-info">
      <span style='color:red;fontSize:14px'>{{err}}</span>
      <span style='color:green;fontSize:14px'>{{result}}</span>
      <div class="adi-email">
        <div style="padding: 5px; fontSize: 18px">EMAIL</div>
        <input
          v-model="$store.state.user.email"
          placeholder="Email*"
          type="email"
          disabled
        />
      </div>
      <div class="adi-name">
        <div style="padding: 5px; fontSize: 18px">USERNAME <div @click='nameEdit=true,save=true' onMouseOut='this.style.textDecoration="unset"' onMouseOver='this.style.textDecoration="underline"' style='cursor:pointer;fontSize:14px;color:grey;width:30px;'>EDIT</div></div>
        <input
          :disabled='!nameEdit'
          v-model="name"
          placeholder="Display name*"
          type="text"
        />
      </div>
      <button @click='saveChange' :disabled='!save' style='marginTop:15px;' class="btn btn-sm btn-danger">Save</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
    data() {
        return {
            name:null,
            nameEdit:false,
            save:false,
            err:'',
            result:'',
        }
    },
    watch: {
        name(e) {
            this.err=''
            this.result=''
        }
    },
    methods: {
        saveChange() {
            this.$store.dispatch('loading')
            firebase.auth().currentUser.updateProfile({
                displayName: this.name,
                phoneNumber: this.phone
            }).then(() => {
                this.save=false
                this.phoneEdit=false
                this.nameEdit=false
                this.result='Save change successfully.'
                this.$store.dispatch('unload')
            }).catch((error) => {
                this.err=error
                this.$store.dispatch('unload')
            });  
        }
    },
    mounted() {
        this.phone=this.$store.state.user.phoneNumber
        this.name=this.$store.state.user.displayName
    }
};
</script>

<style>
.account-detail {
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 15px 25px;
}
.account-detail .ad-title {
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid orange;
  display: flex;
  align-items: center;
}
.account-detail .ad-info div input{
  width: 100%;
  padding:8px 10px;
  font-size: 15px;
  border:none;
  outline:none;
  border:1px solid gainsboro;
  border-radius: 5px;
}
.account-detail .ad-info div input:focus {
    border-color:orange;
}
</style>
