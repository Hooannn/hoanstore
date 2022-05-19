<template>
  <div class="top-product">
      <div class="top-product-header">
          <div class="title">
              <span style='fontWeight:bolder;'>Top Product</span>
          </div>
          <div class="selection">
              <span @click='$store.state.app.topProduct="best-seller"' class='center' :class='{selected:$store.state.app.topProduct=="best-seller"}'>BEST SELLERS</span>
              <span @click='$store.state.app.topProduct="feature"' class='center' :class='{selected:$store.state.app.topProduct=="feature"}'>FEATURE</span>
              <span @click='$store.state.app.topProduct="on-sale"' class='center' :class='{selected:$store.state.app.topProduct=="on-sale"}'>ON SALE</span>
          </div>
      </div>
      <div v-if='$store.state.app.topProduct=="best-seller"' key='best-seller' class="top-product-items">
          <top-product-item v-for='product in topProductItems' :key='product.key' :class='product.key' :product='product'/>
      </div>
      <div v-if='$store.state.app.topProduct=="feature"' key='feature' class="top-product-items">
          <top-product-item v-for='product in featureItems' :key='product.key' :class='product.key' :product='product'/>
      </div>
      <div v-if='$store.state.app.topProduct=="on-sale"' key='on-sale' class="top-product-items">
          <top-product-item v-for='product in onSaleItems' :key='product.key' :class='product.key' :product='product'/>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import TopProductItem from '@/components/HomeComponent/TopProductItem.vue'
export default {
    components: {TopProductItem},
    data() {
        return {
            topProductItems:[],
            featureItems:[],
            onSaleItems:[]
        }
    },
    mounted() {
        this.$store.dispatch('loading')
            this.$rtdbBind('topProductItems',db.ref('productsHighToLowRating').limitToLast(4)).then(()=>{
                this.$store.dispatch('unload')
            }).catch(err=>{
                alert(err)
                this.$store.dispatch('unload')
            })
            this.$rtdbBind('featureItems',db.ref('products').limitToLast(4)).then(()=>{
                this.$store.dispatch('unload')
            }).catch(err=>{
                alert(err)
                this.$store.dispatch('unload')
            })
            this.$rtdbBind('onSaleItems',db.ref('productsHighToLowPrice').limitToLast(4)).then(()=>{
                this.$store.dispatch('unload')
            }).catch(err=>{
                alert(err)
                this.$store.dispatch('unload')
            })
    }
}
</script>

<style>
.sec-3 .top-product {
    width: 100%;
    height: 100%;
}
/* headers */
.sec-3 .top-product .top-product-header {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sec-3 .top-product .top-product-header .title{
    width: 50%;
    display: flex;
    justify-content: start;
}
.sec-3 .top-product .top-product-header .title span{
    font-size: 30px;
}
.sec-3 .top-product .top-product-header .selection{
    width: 50%;
    display: flex;
    justify-content: space-between;
}
.sec-3 .top-product .top-product-header .selection span {
    padding:8px;
    cursor: pointer;
    font-weight: bolder;
    color:rgb(119, 117, 117);
    transition:all .3s ease-in-out;
    width: 150px;
}
.sec-3 .top-product .top-product-header .selection span.selected {
    background-color:orangered;
    color:white;
}
/* items */
.sec-3 .top-product .top-product-items {
    min-height: 350px;
    height: auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}


/*  */
@media only screen and (max-width: 768px) {
    .sec-3 .top-product .top-product-header {
        flex-direction: column;
        height: auto;
        margin-bottom:10px;
    }
    .sec-3 .top-product .top-product-header .title{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .sec-3 .top-product .top-product-header .selection{
        width: 100%;
        justify-content: space-between;
    }
    .sec-3 .top-product .top-product-items {
        height: auto;
        justify-content: space-around;
    }
    .sec-3 .top-product .top-product-header .title span{
        font-size: 21px;
    }
    .sec-3 .top-product .top-product-header .selection span {
        font-size: 13px;
        padding:5px;
    }
}
</style>