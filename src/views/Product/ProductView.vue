<template>
  <div :key='product.key' class="product-view">
      <product-detail :product='product'/>
      <product-more-detail :detail='product.detail' :reviews='reviews'/>
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
            product:{},
            reviews:[]
        }
    },
    mounted() {
        this.$store.dispatch('loading')
        this.$rtdbBind('product',db.ref('products').child(this.$route.params.key)).then(()=>{
            this.$rtdbBind('reviews',db.ref('products').child(this.$route.params.key).child('reviews').orderByChild('time')).then(()=>{
                document.documentElement.scrollTop=0
                this.$store.dispatch('unload')
            }).catch(err=>{
                alert(err)
                this.$store.dispatch('unload')
            })
        }).catch(err=>{
            alert(err)
            this.$store.dispatch('unload')
        })
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