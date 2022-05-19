<template>
  <div class="account-avatar">
        <div class="aa-title">ACCOUNT AVATAR</div>
        <div class='aa-info'>
            <div class="aai-avatar center">
                <div @click='changeAvatar' class="aaia-change center">
                    <span>Change</span><span style='marginLeft:2px;fontSize:18px' class='center'><ion-icon name="shuffle-outline"></ion-icon></span>
                </div>
                <img style='width:100%;height:100%;objectFit:cover' :src="$store.state.user.photoURL" alt="Avatar Image">
            </div>
            <button :disabled='newAvatar==null' @click='saveChange' style='marginTop:25px' class="btn btn-sm btn-danger">Save</button><br>
            <span style='color:green;fontSize:14px;'>{{result}}</span>
            <span style='color:red;fontSize:14px;'>{{err}}</span>
        </div>
  </div>
</template>

<script>
import client from '@/plugins/filestack'
import firebase from "firebase/app";
export default {
    data() {
        return {
            newAvatar:null,
            result:'',
            err:'',
        }
    },
    watch: {
        newAvatar() {
            this.result=''
            this.err=''
        }
    },
    methods:{
        changeAvatar() {
            const options = {
                accept: ["image/*"],
                maxFiles: 1,
                uploadInBackground: false,
                onUploadDone: (res) => {
                    this.newAvatar = res.filesUploaded[0].url;
                    this.$store.state.user.photoURL=this.newAvatar
                }
            }
            client.picker(options).open();
        },
        saveChange() {
            if (this.newAvatar==null) {
                return
            }
            this.$store.dispatch('loading')
            firebase.auth().currentUser.updateProfile({
                photoURL:this.newAvatar
            }).then(()=>{
                this.result='Successfully updated.'
                this.$store.dispatch('unload')
            }).catch((err)=>{
                this.err=err
                this.$store.dispatch('unload')
            })
        }
    }
}
</script>

<style>
.account-avatar { 
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 15px 25px;
}
.account-avatar .aa-title {
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid orange;
  display: flex;
  align-items: center;
}
.account-avatar .aa-info {
    margin:25px 0;
}
.account-avatar .aa-info .aai-avatar{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow:hidden;
    border:1px solid silver;
    position: relative;
    cursor: pointer;
    transition:.2s linear;
}
.account-avatar .aa-info .aai-avatar:hover img{
    filter: blur(2px);
}
.account-avatar .aa-info .aai-avatar:hover .aaia-change {
    visibility: visible;
    opacity: 1;
}
.account-avatar .aa-info .aai-avatar .aaia-change {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index:5;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition:.2s linear;
    color:white;
    font-weight: lighter;
}
</style>