<template>
  <div class="product-reviews">
      <div v-if='reviews.length>0' class="pr-previews">
          <single-review v-for='review in reviews' :key='review[".key"]' :review='review'/>
      </div>
      <div style='fontSize:15px' v-if='reviews.length==0'>
          This product hasn't has any reviews.
      </div>
      <div style='fontSize:15px;padding:10px;color:slategray' v-if='$store.state.user.email==null'>
          <span @click='showLogin' onMouseOver='this.style.textDecoration="underline"' onMouseOut='this.style.textDecoration="unset"' style='color:blue;cursor:pointer'>Login</span> to write your review.
      </div>
      <div v-if='$store.state.user.email!=null' class="pr-input center">
          <div class="pri-avatar center">
              <img style='width:100%;height:100%;objectFit:cover' :src="$store.state.user.photoURL" alt="Avatar Image">
          </div>
          <div class="pri-user-input">
              <star-rating style='marginBottom:4px;marginLeft:10px' :increment=0.1 :active-color='"orange"' :fixed-points=1 :padding=5 :star-size=18 v-model='rating' :read-only='false'/>
              <span style='marginLeft:10px;fontSize:13.5px;color:red;marginTop:-4px'>{{err1}}</span>
              <textarea v-model='review' style='borderRadius:4px;width:100%;marginLeft:5px;outline:none;border:none;backgroundColor:transparent;border:1px solid slategray;padding:10px' placeholder="Write your review..."></textarea>
              <span style='marginLeft:10px;fontSize:13.5px;color:red;   '>{{err2}}</span>
              <button @click='submitReview' style='width:75px;alignSelf:center;marginTop:5px' class="btn btn-sm btn-secondary">Submit</button>
          </div>
      </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import db from '@/plugins/firebase'
import SingleReview from './SingleReview.vue'
export default {
    components:{ StarRating, SingleReview},
    props:{
        reviews:Array
    },
    data() {
        return {
            err1:'',
            err2:'',
            rating:0,
            review:'',
        }
    },
    watch:{
        rating(e) {
            if (e!=0) {
                this.err1=''
            }
        },
        review(e) {
            if (e.trim()!=''&&e!=null) {
                this.err2=''
            }
        }
    },
    methods:{
        showLogin() {
            document.querySelector('#app>div.login-modal').classList.add('show')
        },
        submitReview() {
            if (this.rating==0||this.review.trim()==''||this.review==null) {
                if (this.rating==0) {
                    this.err1='Please rate the product first.'
                }
                if (this.review.trim()==''||this.review==null) {
                    this.err2='Please write your review first.'
                }
                return
            }
            let review={
                date:new Date().toLocaleString(),
                time:-(new Date().getTime()),
                content:this.review,
                rating:this.rating,
                uid:this.$store.state.user.uid,
                avatar:this.$store.state.user.photoURL,
                email:this.$store.state.user.email
            }
            this.$store.dispatch('loading')
            db.ref('products').child(this.$route.params.key).child("reviews").push(review).then(()=>{
                this.review=''
                this.rating=0
                this.$store.dispatch('unload')
            }).catch(err=>{
                alert(err)
                this.review=''
                this.rating=0
                this.$store.dispatch('unload')
            })
        }
    }
}
</script>

<style>
.pr-previews {
    display: flex;
    flex-direction: column;
    max-height: 700px;
    overflow-y:auto;
}
.pr-input .pri-avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}
.pr-input {
    width: 100%;
}
.pr-input textarea {
    resize: none;
    font-size: 14px;
}
.pr-input .pri-user-input {
    display: flex;
    flex-direction: column;
    width: 70%;
}
</style>