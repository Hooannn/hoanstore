<template>
  <div class="wishlish-view-item">
      <div class="wvi-id center">
          {{id}}
      </div>
      <div class="wvi-item">
        <div class="wvii-image" >
            <img style='width:100%;height:100%;objectFit:cover' :src="product.image">
        </div>
        <div class="wvii-title center">
            <span>{{product.title}}</span>
        </div>
        <div class="wvii-price center">
            <span>${{product.price}}</span>
        </div>
        <div class="wvii-view center">
            <button @click='$router.push({name:"product",params:{key:item.key}})' onMouseOut='this.style.backgroundColor="black"' onMouseOver='this.style.backgroundColor="rgb(0,0,0,0.8)"' style='transition:.1s linear;boxShadow:0 0 2px rgba(0,0,0,0.5);border:none;outline:none;backgroundColor:black;color:white;padding:6px'>
                VIEW DETAIL
            </button>
        </div>
        <div class="wvii-delete center">
            <ion-icon @click='removeItem' onMouseOut='this.style.transform="scale(1)"' onMouseOver='this.style.transform="scale(1.1)"' style='cursor:pointer' class='icon' name="trash-outline"></ion-icon>
        </div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    props:{
        id:Number,
        item:Object
    },
    data() {
        return {
            product:{}
        }
    },
    methods: {
        removeItem() {
            this.$bvModal.msgBoxConfirm(`Remove this item from your cart ?`,{
                    title: 'Remove',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Remove',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        this.$store.state.cart.wishlist.splice((this.id-1),1)
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
        }
    },
    mounted() {
        this.$rtdbBind('product',db.ref('products').child(this.item.key))
    }
}
</script>

<style>
.wishlish-view-item {
    width: 100%;
    border-bottom: 1px solid gainsboro;
    display: flex;
}
.wishlish-view-item .wvi-id {
    width: 50px;
    border-right: 1px solid gainsboro;
}
.wishlish-view-item .wvi-item {
    display:flex;
    align-items: center;
    width: 718px;
    justify-content: space-between;
}
.wishlish-view-item .wvi-item .wvii-image {
    width: 120px;
    height: 120px;
}
.wishlish-view-item .wvi-item .wvii-title {
    font-weight: bolder;
    font-size: 16px;
    margin:10px 0;
    width: 200px;
}
.wishlish-view-item .wvi-item .wvii-price {
    width: 100px;
    font-size: 17px;
    color:orangered;
    margin:10px 0;
}
.wishlish-view-item .wvi-item .wvii-view {
    width: 200px;
    margin:10px 0;
}
.wishlish-view-item .wvi-item .wvii-delete {
    width: 50px;
    font-size: 20px;
    color:orangered;
    margin:10px 0;
}
/*  */ 
@media only screen and (max-width: 768px) {
    .wishlish-view-item .wvi-item {
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>