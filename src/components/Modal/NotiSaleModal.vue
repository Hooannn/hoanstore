<template>
  <div @click='close_' class="nsm-cover center">
      <div class="nsm-content">
            <ion-icon @click='close' onMouseOver='this.style.transform="rotate(90deg)";this.style.color="orangered"' onMouseOut='this.style.transform="rotate(0)";this.style.color="white"' style='color:white;cursor:pointer;transition:.3s linear;position:absolute;top:5px;right:5px;fontSize:30px;zIndex:5' name="close-circle-outline" class='close-icon'></ion-icon>
            <div class='nsm-content-text'>
                <h3>SUMMER SALE</h3>
                <h4>UP TO 49%</h4>
                <div>from 21/5/2022 - 21/5/2030</div>
                <button >Check it now <i style='transition:.2s linear' class="fas fa-angle-double-right"></i></button>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        close() {
            let modal=document.querySelector('.nsm-cover')
            modal.classList.add('hide')
        },
        close_(e) {
            let modal=document.querySelector('.nsm-cover')
            if (e.target==modal) {
                modal.classList.add('hide')
            }
        }
    }
}
</script>

<style>
.nsm-cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
}
.nsm-cover.hide {
    display: none;
}
.nsm-cover .nsm-content {
    position: relative;
    width: 768px;
    height: 300px;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    background: url(https://wallpaperaccess.com/full/2126190.png) no-repeat center/cover;
    border: 2px solid white;
    animation: show .4s linear;
}
.nsm-cover .nsm-content .nsm-content-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.nsm-cover .nsm-content .nsm-content-text h3{
    color:orange;
    font-weight: bolder;
    font-size: 35px;
    text-shadow: 0 0 3px rgba(0,0,0,0.2);
}
.nsm-cover .nsm-content .nsm-content-text h4 {
    text-shadow: 0 0 3px rgba(0,0,0,0.2);
    color:white;
    font-size: 28px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.nsm-cover .nsm-content .nsm-content-text div {
    text-shadow: 0 0 3px rgba(0,0,0,0.2);
    color:rgb(206, 200, 200);
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.nsm-cover .nsm-content .nsm-content-text button {
    width:140px;
    border:none;
    outline:none;
    background:transparent;
    color:rgb(238, 196, 59);
    position:absolute;
    bottom:5px;
    left:50%;
    height: 40px;
    transform:translateX(-50%);
    transition:.2s linear;
}
.nsm-cover .nsm-content .nsm-content-text button:hover {
    background-color:whitesmoke;
    color:orangered;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    border-radius: 3px;
}
.nsm-cover .nsm-content .nsm-content-text button:hover i {
    transform: translateX(3px);
}
@keyframes show {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
}
/*  */
@media only screen and (max-width: 768px) {
    .nsm-cover .nsm-content {
        width: 80%;
    }
}
@media only screen and (max-width: 425px) {
    .nsm-cover .nsm-content {
        height: 200px;
    }
    .nsm-cover .nsm-content .nsm-content-text h3 {
        font-size: 25px;
    }
    .nsm-cover .nsm-content .nsm-content-text h4 {
        font-size: 20px;
    }
    .nsm-cover .nsm-content .nsm-content-text button {
        position: relative;
        transform: translate(0);
        left:0;
        bottom:0;
    }
    .nsm-cover .nsm-content .nsm-content-text div {
        font-size: 15px;
    }
}
</style>