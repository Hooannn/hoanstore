<template>
  <div class="wishlist-bar-item">
      <div class="wbi-image">
        <img style='width:100%;height:100%;objectFit:cover' :src="wishlistItem.image">
      </div>
      <div class="wbi-detail">
        <div class="wbid-title">{{wishlistItem.title}}</div>
        <div class="wbid-price">
          <span style='color:orangered;fontWeight:bolder'>${{product.price}}</span>
        </div>
      </div>
      <div class="wbi-delete center">
        <ion-icon @click='removeItem' class='icon' name="trash-outline"></ion-icon>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
  props:{
    item:Object,
    index:Number,
  },
  data() {
    return {
      product:{},
      wishlistItem:{},
    }
  },
  filters:{
    upperFirstCase(string) {
      return string[0].toUpperCase() + string.substring(1)
    }
  },
  methods: {
    removeItem() {
      this.$bvModal.msgBoxConfirm(`Remove this item from your wishlist ?`,{
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
                        this.$store.state.cart.wishlist.splice(this.index,1)
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
      //let wbi=document.querySelector(`#app > div.wishlist-bar.show > div > div.cbc-items > div.wishlist-bar-item.wbi${this.index}`)
      //wbi.remove()
    }
  },
  mounted() {
    this.$rtdbBind('product',db.ref('products').child(this.item.key))
      this.wishlistItem.image=this.product.images[0]
      this.wishlistItem.price=this.product.price
      this.wishlistItem.title=this.product.title
  }
}
</script>

<style>
.wishlist-bar-item {
  width: 320px;
  height: 100px;
  display: flex;
  margin:2.5px 0;
}
.wishlist-bar-item .wbi-image {
  height: 100%;
  width: 100px;
  background-color: aliceblue;
}
.wishlist-bar-item .wbi-detail {
  width: 175px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wishlist-bar-item .wbi-detail .wbid-title{
  font-size: 17px;
  font-weight: bolder;
}
.wishlist-bar-item .wbi-delete {
  width: 45px;
  height: 100%;
}
.wishlist-bar-item .wbi-delete .icon {
  font-size: 20px;
  color:orangered;
  cursor: pointer;
  transition: .1s linear;
}
.wishlist-bar-item .wbi-delete .icon:hover {
  transform: scale(1.1);
}
</style>