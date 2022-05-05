<template>
  <div class="navigation center">
      <div class='current-ng-name'>
        {{$route.name.toUpperCase()}}
      </div>
      <div class='current-ng center'>
        <span style='cursor:pointer' @click='$router.push({name:"home"})'>Home</span>
        <div class='center' v-for='p in path' :key='p'>
          <span style='color:rgba(245,245,245,0.7)' class='center'><ion-icon name="chevron-forward-outline"></ion-icon></span>
          <span :class='{selected:$route.name==p}' @click='$router.push({name:p})' style='cursor:pointer'>{{p|upperFirstCase}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path:[]
    }
  },
  filters:{
    upperFirstCase(string) {
      if (string) {
        return string[0].toUpperCase() + string.substring(1)
      }
    }
  },
  mounted() {
    let path=this.$route.fullPath.split('/')
    path.forEach(path => {
      if (isNaN(path)) {
        this.path.push(path)
      }
    });
  }
}
</script>

<style>
.navigation {
  flex-direction: column;
  width: 100vw;
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
.navigation .current-ng span:hover,.navigation .current-ng div span:hover {
  color:orangered;
}
.navigation .current-ng div span.selected {
  color:orangered;
}

/*  */
@media only screen and (max-width: 425px) {
  .navigation .current-ng-name {
    font-size: 18px;
  }
  .navigation .current-ng {
    font-size: 14px;
  }
  .navigation {
    height: 150px;
  }
}
</style>