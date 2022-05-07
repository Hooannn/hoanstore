<template>
  <div class="account-view">
      <div class="first-col">
          <account-detail/>
          <account-password/>
      </div>
      <div class="second-col">
          <bill-list/>
      </div>
      <button @click='logOut' style='margin:0 auto;marginTop:25px' class="btn btn-sm btn-dark">Logout</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import AccountDetail from '@/components/Account/AccountDetail.vue'
import store from '@/store/store'
import AccountPassword from '@/components/Account/AccountPassword.vue'
import BillList from '@/components/Account/BillList.vue'
export default {
  components: { AccountDetail, AccountPassword, BillList },
  methods: {
      logOut() {
            this.$store.dispatch('loading')
            firebase.auth().signOut().then(() => {
                this.$store.state.user={}
                this.$router.go()
                this.$store.dispatch('unload')
            }).catch((error) => {
                alert(err)
                this.$store.dispatch('unload')
            });
        },
  },
  beforeRouteEnter(to,from,next) {
      if (store.state.user.email==null) {
          next("/home")
      }
      next()
  }
}
</script>

<style>
.account-view {
    margin:0 auto;
    width:1280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.account-view .first-col,.account-view .second-col {
    margin-top:25px;
    width: 49%;
    display: flex;
    flex-direction: column;
}

/*  */
@media only screen and (max-width: 1280px) {
    .account-view {
        width: 100%;
    }
}
@media only screen and (max-width: 768px) {
    .account-view {
        width: 95%;
    }
    .account-view .first-col,.account-view .second-col {
        width: 100%;
    }
}
</style>