<template>
  <div class="single-review center">
      <div class="sr-avatar">
          <img style='width:100%;height:100%;objectFit:cover' :src="review.avatar" alt="Avatar img">
      </div>
      <div class="sr-content">
          <div class="src-date src-email">
              <span class='center' style='fontSize:15px;fontWeight:bold'>{{review.email}}</span>
              <span class='center' style='fontSize:13.5px;fontWeight:lighter'>{{review.date}}</span>
          </div>
          <div class="src-text">
              <pre style='fontSize:14px;padding:0 5px'>{{review.content}}</pre>
          </div>
          <star-rating style='fontSize:14px;' :increment=0.1 :active-color='"orange"' :fixed-points=1 :padding=5 :star-size=15 v-model='review.rating' :read-only='true'/>
      </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
    components:{StarRating},
    props:{
        review:Object
    },
}
</script>

<style>
.single-review {
    padding:20px 0;
}
.single-review .sr-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}
.single-review .sr-content {
    margin-left: 5px;
    width: 80%;
    display: flex;
    flex-direction: column;
}
.single-review .sr-content .src-date {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
</style>