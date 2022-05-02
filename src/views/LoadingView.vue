<template>
  <div class="loading-view">
    <div class='loader-cover' style='width:50px;height:50px;borderRadius:50%;display:flex;justifyContent:center;alignItems:center;backgroundColor:#313131'>
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
</script>

<style>
.loading-view {
  min-width: 100vw;
  min-height: 100vh;
  position:fixed;
  top:0;
  left:0;
  z-index: 99999;
  cursor:wait;
  display: flex;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
}
.loading-view.show {
  visibility: visible;
  opacity: 1;
}
.loading-view .loader-cover {
  margin-top:165px;
}
.loading-view .loader {
  width: 35px;
  height: 35px;
  border: 3px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  border-top: 3px solid orange;
  animation: spin 0.7s infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>