<template>
  <div class="recommend-product">
    <div class='rp-title'>YOU MAY ALSO LIKE</div>
    <div class="rp-products">
      <top-product-item v-for='product in products' :key='product.key' :class='product.key' :product='product'/>
    </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import TopProductItem from '../HomeComponent/TopProductItem.vue'
export default {
  components: { TopProductItem },
  props:{
    type:String
  },
  data() {
    return {
      products:[],
    }
  },
  mounted() {
    let type=this.type
    this.$rtdbBind('products',db.ref('products').orderByChild('type').equalTo(type).limitToLast(4))
  }
}
</script>

<style>
.recommend-product {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.recommend-product .rp-title {
  font-weight: bolder;
  font-size: 28px;
}
.recommend-product .rp-products {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/*  */
@media only screen and (max-width: 768px) {
  .recommend-product .rp-title {
    font-size: 23px;
  }
}
@media only screen and (max-width: 559px) {
  .recommend-product .rp-products {
    justify-content: space-around;
  }
  
}
</style>