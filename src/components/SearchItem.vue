<template>
  <div @click='viewItem' class="search-item">
      <div class="si-image">
          <img style='width:100%;height:100%;objectFit:cover' :src="item.image" alt="item image">
      </div>
      <div class="si-info">
          <span style='color:orangered;'>{{item.title}}</span>
          <span style='color:slategray;fontSize:14px;'>Type: {{item.type[0].toUpperCase() + item.type.substring(1)}}</span>
          <span style='fontSize:15px'>${{item.price}} <span style='color:orangered;textDecoration:line-through;fontWeight:bold'>${{Math.floor(item.price+(item.price*50/100))}}</span></span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        item:Object
    },
    methods:{
        viewItem() {
            this.$emit("resetResult")
            if (this.$route.name=="product"&&this.$route.params.key==this.item.key) {
                return 
            }
            this.$router.push({name:"product",params:{key:this.item.key}})
        }
    }
}
</script>

<style>
.search-item {
    padding:10px;
    display: flex;
    cursor: pointer;
    transition:.1s linear;
}
.search-item:hover {
    background-color:rgb(243, 235, 220);
}
.search-item .si-image {
    max-width: 70px;
    max-height: 70px;
}
.search-item .si-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
</style>