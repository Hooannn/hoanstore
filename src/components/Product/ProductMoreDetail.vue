<template>
  <div class="product-more-detail">
    <div class="pmd-header">
      <div :class='{selected:selected=="detail"}' @click='selected="detail"' class="pd-more-des center">
        Detail
      </div>
      <div :class='{selected:selected=="reviews"}' @click='selected="reviews"' class="pd-reviews center">
        Reviews
      </div>
    </div>
    <div v-if='selected=="detail"' class="pmd-content detail">
      <pre>
        {{detail||lorem}}
      </pre>
    </div>
    <div v-if='selected=="reviews"' class="pmd-content reviews">
      <product-reviews :reviews='reviews'/>
    </div>
    <div></div>
  </div>
</template>

<script>
import ProductReviews from './ProductReviews.vue'
export default {
  components: { ProductReviews },
  props:{
    reviews:Array,
    detail:String
  },
  data() {
    return {
      selected:'reviews',
      lorem:`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem cum repellat quisquam, 
      facere quo sint dolorem. Aut molestiae voluptatum natus doloremque ut! 
      Illum sit natus voluptatibus, consequatur ipsa harum cum.`
    }
  }
}
</script>

<style>
.product-more-detail {
    width:100%;
}
.product-more-detail .pmd-header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
}
.product-more-detail .pmd-header div {
  font-size: 20px;
  color:grey;
  padding:10px;
  cursor: pointer;
  width: 150px;
}
.product-more-detail .pmd-header div.selected {
  color:orangered;
}
.product-more-detail .pmd-content {
  padding:10px;
}
/*  */
@media only screen and (max-width: 768px) {
  .product-more-detail .pmd-header div {
      font-size: 18px;
      padding:5px;
      width: 100px;
  }
  .product-more-detail .pmd-content {
    font-size: 15px;
  }
}
</style>