<template>
  <div class="shop-view">
        <div class="sv-filter">
            <div class="sv-filter-filt">
                <h5>Filter</h5>
            </div>
            <div class="sv-filter-sort">
                <h5>Sort</h5>
            </div>
        </div>
        <div v-if='filter=="grid"' class="sv-products" :class="{'grid-type':filter=='grid'}">
            <top-product-item v-for='product in products' :key='product.key' :class='product.key' :product='product' />
        </div>
        <div :key='currentPage' class="sv-pages">
            <div @click='$router.push({name:"shop",params:{page:currentPage-1}})' class="svp-previous-icon"><ion-icon name="chevron-back-outline"></ion-icon></div>
            <div @click='$router.push({name:"shop",params:{page:1}})' :class='{selected:currentPage==1}' v-if='currentPage<3'>1</div>
            <div @click='$router.push({name:"shop",params:{page:2}})' :class='{selected:currentPage==2}' v-if='currentPage<3'>2</div>
            <div @click='$router.push({name:"shop",params:{page:3}})' :class='{selected:currentPage==3}' v-if='currentPage<3'>3</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage-1}})' v-if='currentPage>=3' class="svp-previous-page">{{currentPage-1}}</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage}})' v-if='currentPage>=3' class="svp-current-page selected">{{currentPage}}</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage+1}})' v-if='currentPage>=3' class="svp-next-page">{{currentPage+1}}</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage+1}})' class="svp-next-icon"><ion-icon name="chevron-forward-outline"></ion-icon></div>
        </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import TopProductItem from '@/components/HomeComponent/TopProductItem.vue'
export default {
  components: { TopProductItem },
    data() {
        return {
            products:[],
            filter:'grid',
            currentPage:1
        }
    },
    mounted() {
        this.$store.dispatch('loading')
        this.$rtdbBind('products',db.ref('products')).then(()=>{
            this.$store.dispatch('unload')
            this.currentPage=parseInt(this.$route.params.page,10)
        }).catch(err=>{
            alert(err)
            this.$store.dispatch('unload')
        })
    }
}
</script>

<style>
.shop-view {
    width: 1280px;
    margin:0 auto;
    position: relative;
}
.shop-view .sv-filter {
    width: 100%;
    height: 80px;
}
.shop-view .sv-products.grid-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.shop-view .sv-pages {
    height: 30px;
    width: 200px;
    position:absolute;
    top:100%;
    left:50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
}
.shop-view .sv-pages div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color:white;
    box-shadow: 0 0 2px rgba(0,0,0,0);
    transition: .1s linear;
}
.shop-view .sv-pages div.selected {
    background-color:orange;
    color:white;
}
.shop-view .sv-pages div:hover {
    background-color:orange;
    color:white;
}
</style>