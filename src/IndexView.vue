<template>
  <div class="home">
    <router-view/>
  </div>
</template>

<script>

export default {
  beforeRouteEnter(to,from,next) {
    if (to.name=='default') {
      next('/home')
    }
    next()
  }
}
</script>
<style scoped>
.home {
  width: 100vw;
}
</style>
