<template>
  <div :key='product.key' class="product-view">
      <product-detail :product='product'/>
      <product-more-detail/>
      <recommend-product :type='product.type'/>
  </div>
</template>

<script>
import ProductDetail from '@/components/Product/ProductDetail.vue'
import ProductMoreDetail from '@/components/Product/ProductMoreDetail.vue'
import RecommendProduct from '@/components/Product/RecommendProduct.vue'
import db from '@/plugins/firebase'
export default {
    components:{ProductDetail,ProductMoreDetail,RecommendProduct},
    data() {
        return {
            product:{}
        }
    },
    mounted() {
        this.$rtdbBind('product',db.ref('products').child(this.$route.params.key))
    }
}
</script>

<style>
.product-view {
    width: 1280px;
    margin:0 auto;
    position: relative;
}
/* */
@media only screen and (max-width: 1280px) {
    .product-view{
        width: 100vw;
    }
}
</style>