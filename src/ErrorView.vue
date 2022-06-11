<template>
  <div class="error-view center" style='padding:20px'>
    <div>
      Sorry. We can't find this page. <button @click='$router.push({name:"home"})' style='outline:none;border:none;boxShadow:none' class="btn btn-link">Go back home</button>
    </div>
    <div>
      <ion-icon name="document-text-outline"></ion-icon>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.error-view {
  flex-direction: column;
}
.error-view>div:nth-child(2) {
  font-size: 100px;
  color: #ccc;
}
</style>