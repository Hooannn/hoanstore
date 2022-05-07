<template>
  <div class="shop-view">
        <div class="sv-filter">
            <div class="sv-filter-filt center">
                <span @click='$store.state.app.viewMode="list"' :class='{selected:$store.state.app.viewMode=="list"}'><ion-icon name="list-outline"></ion-icon></span>
                <span @click='$store.state.app.viewMode="grid"' :class='{selected:$store.state.app.viewMode=="grid"}'><ion-icon name="grid-outline"></ion-icon></span>
            </div>
            <div class="sv-filter-sort center">
                <span>Sort:</span>
                <select v-model='sort'>
                    <option><ion-icon name="trending-up-outline"></ion-icon>Select</option>
                    <option><ion-icon name="trending-up-outline"></ion-icon> Price: Lower to High</option>
                    <option><ion-icon name="trending-down-outline"></ion-icon> Price: High to Lower</option>
                    <option><ion-icon name="bar-chart-outline"></ion-icon> Rating</option>
                </select>
            </div>
        </div>
        <div v-if='products.length==0' class="not-found">
            Sorry we can't find any thing.
        </div>
        <div v-if='$store.state.app.viewMode=="grid"' class="sv-products" :class="{'grid-type':$store.state.app.viewMode=='grid'}">
            <top-product-item v-for='product in products' :key='product.key' :class='product.key' :product='product' />
        </div>
        <div v-if='$store.state.app.viewMode=="list"' class="sv-products" :class="{'grid-type':$store.state.app.viewMode=='grid'}">
            <shop-product v-for='product in products' :key='product.key' :class='product.key' :product='product' />
        </div>
        <div :key='currentPage' class="sv-pages">
            <div @click='$router.push({name:"shop",params:{page:currentPage-1}})' class="svp-previous-icon"><ion-icon name="chevron-back-outline"></ion-icon></div>
            <div @click='$router.push({name:"shop",params:{page:1}})' :class='{selected:currentPage==1}' v-if='currentPage<3'>1</div>
            <div @click='$router.push({name:"shop",params:{page:2}})' :class='{selected:currentPage==2}' v-if='currentPage<3&& products.length!=0'>2</div>
            <div @click='$router.push({name:"shop",params:{page:3}})' :class='{selected:currentPage==3}' v-if='currentPage<3&& products.length!=0'>3</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage-1}})' v-if='currentPage>=3' class="svp-previous-page">{{currentPage-1}}</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage}})' v-if='currentPage>=3' class="svp-current-page selected">{{currentPage}}</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage+1}})' v-if='currentPage>=3 && products.length!=0' class="svp-next-page">{{currentPage+1}}</div>
            <div @click='$router.push({name:"shop",params:{page:currentPage+1}})' v-if='products.length!=0' class="svp-next-icon"><ion-icon name="chevron-forward-outline"></ion-icon></div>
        </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import TopProductItem from '@/components/HomeComponent/TopProductItem.vue'
import ShopProduct from '@/components/Shop/ShopProduct.vue'
export default {
  components: { TopProductItem, ShopProduct },
    data() {
        return {
            sort:'Select',
            products:[],
            currentPage:1,
            loadProduct:1,
        }
    },
    mounted() {
        if (this.$route.params.page==1) {
            this.loadProduct=1
        }
        else {
            this.loadProduct=(this.$route.params.page-1)*8
        }
        this.$store.dispatch('loading')
        this.$rtdbBind('products',db.ref('products').orderByChild('id').startAt(this.loadProduct).limitToFirst(8)).then(()=>{
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.shop-view .sv-filter .sv-filter-filt span{
    font-size: 30px;
    margin:0 5px;
    cursor: pointer;
}
.shop-view .sv-filter .sv-filter-filt span.selected {
    color:orange;
}
.shop-view .sv-filter .sv-filter-filt span:hover{
    color:orange;
}
.shop-view .sv-filter .sv-filter-sort,.shop-view .sv-filter .sv-filter-filt {
    height: 100%;
}
.shop-view .sv-filter .sv-filter-sort span {
    font-size: 18px;
}
.shop-view .sv-filter .sv-filter-sort select {
    outline:none;
    border:none;
    background-color: transparent;
    padding:10px;
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
/*  */
@media only screen and (max-width: 1280px) {
    .shop-view{
        width: 100vw;
        height: auto;
    }
}
@media only screen and (max-width: 768px) {
    .shop-view .sv-filter .sv-filter-filt span {
        font-size: 25px;
    }
    .shop-view .sv-filter .sv-filter-sort span {
        font-size: 15px;
    }
    .shop-view .sv-filter .sv-filter-sort select {
        font-size: 15px;
    }
    .shop-view .sv-filter {
        justify-content: space-around;
    }
}
@media only screen and (max-width: 560px) {
    .shop-view .sv-products.grid-type {
        justify-content: space-around;
    }
}
</style>