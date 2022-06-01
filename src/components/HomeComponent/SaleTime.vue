<template>
  <div class="sale-time ">
      <div class="st-title center">
          <div style='position:absolute;top:0;left:0;width:100%;height:100%;zIndex:-1;filter: blur(4px);'>
              <img style='width:100%;height:100%;objectFit:cover' src="https://wallpaperaccess.com/full/4624866.jpg" alt="Image">
          </div>
          <span>Upcoming Sale</span>
      </div>
      <div v-if='timeremain!=0' class="st-digital-clock center">
          <div :key='"sale-time"+hours' class="stdc-cardtime">{{hours}}</div>
          <div :key='"sale-time"+minutes' class="stdc-cardtime">{{minutes}}</div>
          <div :key='"sale-time"+seconds' style='animation:none' class="stdc-cardtime">{{seconds}}</div>
      </div>
      <div v-if='timeremain==0' style='margin:10px 0' class='center'>
          <div class="st-loader"></div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            saleTime:0,
            timeStart:0,
            timerId:null,
            timeremain:0,
            hours:0,
            minutes:0,
            seconds:0
        }
    },
    computed:{
        formatDate() {
            this.timeremain = parseInt(this.timeremain, 10);
            this.hours   = Math.floor(this.timeremain / 3600);
            this.minutes = Math.floor((this.timeremain - (hours * 3600)) / 60);
            this.seconds = this.timeremain - (hours * 3600) - (minutes * 60);
            if (hours   < 10) {hours   = `0${hours}`}
            if (minutes < 10) {minutes = `0${minutes}`}
            if (seconds < 10) {seconds = `0${seconds}`}
            return `${hours}:${minutes}:${seconds}`
        },
    },
    watch:{
        timeremain(e) {
            if (e<=0) {
                clearInterval(this.timerId)
                this.timeremain=0
            }
        }
    },
    methods:{
        getTimeRemain() {
            if (this.timeStart!=0) {
                this.timeremain=((this.saleTime)*60*60)-(Math.floor((new Date().getTime()-this.timeStart)/1000))
                this.timeremain = parseInt(this.timeremain, 10);
                this.hours   = Math.floor(this.timeremain / 3600);
                this.minutes = Math.floor((this.timeremain - (this.hours * 3600)) / 60);
                this.seconds = this.timeremain - (this.hours * 3600) - (this.minutes * 60);
                if (this.hours   < 10) {this.hours   = `0${this.hours}`}
                if (this.minutes < 10) {this.minutes = `0${this.minutes}`}
                if (this.seconds < 10) {this.seconds = `0${this.seconds}`}
                if (this.timeremain==0) {
                    return
                }
            }
            else {
                return
            }
        },
    },
    mounted() {
        db.ref('saletime').child('start').get().then(res=>{
            this.timeStart=res.val()
        }).catch(err=>{console.log(err)})
        db.ref('saletime').child('last').get().then(res=>{
            this.saleTime=res.val()
        }).catch(err=>{console.log(err)})
        this.timerId=setInterval(this.getTimeRemain, 1000)
    },
    destroyed() {
        clearInterval(this.timerId)
    }
    
}
</script>

<style>
.sale-time {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position:relative;
}
.sale-time .st-loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border:12px solid whitesmoke;
    border-top-color: var(--bs-teal);
    animation:spin .5s linear infinite;
}
.sale-time .st-title {
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    font-size: 40px;
    color:orangered;
}
.sale-time .st-digital-clock .stdc-cardtime {
    padding:10px;
    margin:10px;
    width: 70px;
    height: 90px;
    box-shadow: 0 0 2px 2px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color:white;
    background-color:var(--bs-gray-dark);
    font-size: 26px;
    animation:flip 1s linear;
}
@keyframes flip {
    0% {
        transform: rotateX(0);
        opacity: 0;
    }
    50% {
        transform: rotateX(90deg);
    }
    100% {
        transform: rotateX(0);
        opacity: 1;
    }
}
@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
@media only screen and (max-width: 768px) {
    .sale-time {
        height: 170px;
    }
    .sale-time .st-title {
        font-size: 30px;
    }
    .sale-time .st-digital-clock .stdc-cardtime {
        width: 55px;
        height: 70px;
        font-size: 20px;
    }
}
@media only screen and (max-width: 320px) {
    .sale-time {
        height: 150px;
    }
    .sale-time .st-title {
        font-size: 23px;
    }
    .sale-time .st-digital-clock .stdc-cardtime {
        width: 45px;
        height: 60px;
        font-size: 17px;
    }
}
</style>