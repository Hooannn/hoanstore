<template>
  <div class="footer-bar">
          <div class="top-footer">
              <div class="tf-content">
                <div class="tf-store">
                    <div style='display:flex'>
                        <img style='width:190px;height:45px;boxShadow: 2px 2px 5px rgba(0,0,0,0.8);borderRadius: 5px;' :src="icon">
                    </div>
                    <div>
                        <span><strong>Phone:</strong> 0501110222</span>
                    </div>
                    <div>
                        <span><strong>Address:</strong> hoanthui's Store</span>
                    </div>
                    <div>
                        <span><strong>Email:</strong> hoanthuistore@gmail.com</span>
                    </div>
                    <div>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-facebook"></ion-icon></span>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-twitter"></ion-icon></span>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-pinterest"></ion-icon></span>
                        <span style='fontSize:20px;margin:0px 5px;'><ion-icon onMouseOut='this.style.color="unset"' onMouseOver='this.style.color="orange"' style='cursor:pointer;transition:.2s linear' name="logo-instagram"></ion-icon></span>
                    </div>
                </div>
                <div class="tf-information">
                    <h5>INFORMATION</h5>
                    <span @click='goHome'>Home</span>
                    <span @click='$router.push({name:"shop",params:{page:1}})'>Shop</span>
                    <span v-if='$store.state.user.email!=null' @click='$router.push({name:"account"})'>Account</span>
                </div>
                <div class="tf-newsletter">
                    <h5>NEWSLETTER</h5>
                    <input v-model='email' style='outline:none;width:220px' type="email" placeholder="Enter your mail...">
                    <span style='color:red;fontSize:13.5px;'>{{err}}</span>
                    <button @click='send' style='width:60px;margin:5px;' class="btn btn-sm btn-dark">SEND</button>
                </div>
              </div>
          </div>
          <div class="bottom-footer">
              <div class="bf-content">
                  <div class="bf-copyright">
                    <span style='color:white'><i class="fas fa-copyright"></i> CopyRight 2022 <span style='color:orange;fontWeight:bolder'>hoanthui's Store</span></span>
                  </div>
                  <div style='color:white;fontWeight:lighter' class="bf-inspired">
                      Inspired by <a target='_black' href="https://andshop-vue.netlify.app/">https://andshop-vue.netlify.app</a>
                  </div>
                  <div style='width:100px;display:flex;justifyContent:space-between;alignItems:center' class="bf-supported">
                    <span class='center' style='color:orange;fontSize:24px'><ion-icon name="logo-firebase"></ion-icon></span>
                    <span class='center' style='color:#5a96ff;fontSize:24px'><ion-icon name="logo-ionic"></ion-icon></span>
                    <span class='center' style='color:rgb(66, 184, 131);fontSize:24px'><ion-icon name="logo-vue"></ion-icon></span>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>
import icon from '@/assets/Icon/icon1.png'
export default {
    data() {
        return {
            icon:icon,
            email:'',
            err:''
        }
    },
    watch: {
        email(e) {
            if (e.trim()!='' && e!=null) {
                this.err=''
            }
        }
    },
    methods: {
        send() {
            if (this.email.trim()=='' || this.email==null) {
                this.err='Your email is empty.'
                return
            }
            else {
                this.$bvModal.msgBoxOk('Thanks you. Check your email regularly to get news information.', {
                        title: 'Success',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                })
                this.email=''
            }
        },
        goHome() {
            if (this.$route.name=="home") {
                document.documentElement.scrollTop=0
                return
            }
            this.$router.push({name:"home"})
        }
    }

}
</script>

<style>
.footer-bar {
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top:50px;
    box-shadow: 0 0 2px rgba(0,0,0,0.4);
}
.footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
    width: 1280px;
    margin:0 auto;
}
.footer-bar .top-footer .tf-content {
    display: flex;
    justify-content: space-between;
}
.footer-bar .top-footer .tf-content .tf-store,.footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
    width: 30%;
    display: flex;
    flex-direction: column;
}
.footer-bar .top-footer .tf-content .tf-information span {
    cursor: pointer;
    transition: .2s linear;
}
.footer-bar .top-footer .tf-content .tf-information span:hover {
    color:orange;
}
.footer-bar .top-footer .tf-content .tf-store>div {
    padding:5px;
}
.footer-bar .top-footer .tf-content .tf-information * {
    padding:5px
}
.footer-bar .top-footer .tf-content .tf-newsletter * {
    padding:5px
}
.footer-bar .top-footer .tf-content .tf-newsletter input {
    border:none;
    border:1px solid gainsboro;
}
.footer-bar .top-footer .tf-content .tf-newsletter input:focus {
    border-color:orange;
}
.footer-bar .top-footer {
    background-color:white;
    padding:10px 0;
}
.footer-bar .bottom-footer {
    padding:10px 0;
    background-color:black;
}
.footer-bar .bottom-footer .bf-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/*  */
@media only screen and (max-width: 1280px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        width: 1190px;
        margin:0 auto;
    }
}
@media only screen and (max-width: 1190px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        width: 768px;
        margin:0 auto;
    }
}
@media only screen and (max-width: 768px) {
    .footer-bar .top-footer .tf-content,.footer-bar .bottom-footer .bf-content {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
        margin-top: 10px;
    }
    .footer-bar .top-footer .tf-content .tf-store,.footer-bar .top-footer .tf-content .tf-information,.footer-bar .top-footer .tf-content .tf-newsletter {
        width: 100%;
        display: flex;
        align-items: center;
    }
}
</style>