<template>
  <div class="manage-view center">
      <button class="btn btn-sm btn-dark">Sort Low to High</button>
      <button class="btn btn-sm btn-dark">Sort High to Low</button>
      <button class="btn btn-sm btn-dark">Sort Rating</button>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
  firebase:{
    data:db.ref('products')
  },
  data() {
    return {
      data:[],
      lowToHigh:[],
      highToLow:[],
      rating:[]
    }
  },
  methods:{
    sortLowtoHigh() {
      this.lowToHigh.forEach((item,index) => {
        db.ref('productsLowToHighPrice').push(item).then((res)=>{
          db.ref('productsLowToHighPrice').child(res.key).child('id').set((index+1))
        })
      });
    },
    sortHightoLow() {
      this.lowToHigh.sort().reverse().forEach((item,index)=>{
        db.ref('productsHighToLowPrice').push(item).then((res)=>{
          db.ref('productsHighToLowPrice').child(res.key).child('id').set((index+1))
        })
      })
    },
    sortRating() {
      this.rating.forEach((item,index) => {
        db.ref('productsHighToLowRating').push(item).then((res)=>{
          db.ref('productsHighToLowRating').child(res.key).child('id').set((index+1))
        })
      });
    },
  },
  mounted() {
    this.$rtdbBind('lowToHigh',db.ref('products').orderByChild('price'))
    this.$rtdbBind('rating',db.ref('products').orderByChild('rating/rate'))
  }
}
</script>

<style>
.manage-view button {
  margin:10px;
}
</style>