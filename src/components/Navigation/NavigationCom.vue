<template>
  <div :key='$route.path' class="navigation center">
      <div class='current-ng-name'>
        {{$route.name.toUpperCase()}}
      </div>
      <div class='current-ng'>
        <span @click='$router.push({name:"home"})'>Home</span>
        <span>/</span>
        <span>{{$route.name}}</span>
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.navigation {
  flex-direction: column;
  width: 100%;
  padding-top:50px;
  height: 200px;
  background:url(https://wallpaperaccess.com/full/518331.jpg) no-repeat center/cover;
}
.navigation .current-ng-name {
  color:white;
  font-size: 30px;
}
.navigation .current-ng {
  color:white;
  font-size: 15px;
}
</style>