<template>
  <div class="order-detail">
      <div class="od-title">
          <div class="odt-item center">
              <span>Item</span>
          </div>
          <div class="odt-quantity center">
              <span>Quantity</span>
          </div>
          <div class="odt-price center">
              <span>Price</span>
          </div>
      </div>
      <div v-for='(item,index) in items' :key='"odi"+index' class="od-items">
          <div style='flexDirection:column;' class="odi-title center">
              <div style='fontWeight:bold'>{{item.title}}</div> 
              <div style='fontSize:14px;color:gray'>( <span>Color : {{item.color|upperFirstCase}}</span><span v-if='item.kswitch'>, Switch : {{item.kswitch|upperFirstCase}} </span> )</div>
          </div>
          <div class="odi-quantity center">
              {{item.quantity}}
          </div>
          <div class="odi-price center">
              ${{item.quantity*item.price}}
          </div>
      </div>
      <div v-if='$store.state.cart.description.trim()!=""&&$store.state.cart.description!=null' class="od-des">
          <span style='fontWeight:bold;fontSize:17px;'>Order description:</span>
          <pre >
              {{$store.state.cart.description}}
          </pre>
      </div>
      <div class='od-total'>
          <div style='fontWeight:bolder'>
              TOTAL:
          </div>
          <div style='fontSize:18px;color:orangered;fontWeight:bold'>
              ${{$store.state.cart.cartTotal}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items:[]
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
        let items=[]
        this.$store.state.cart.cart.forEach(e => {
            items.push({
                key:e.key,
                image:e.image,
                kswitch:e.kswitch,
                color:e.color,
                title:e.title,
                quantity:e.quantity,
                price:e.price
            })
        });
        items.forEach(item => {
            if (this.items.find(i=>(item.key==i.key&&item.image==i.image&&item.kswitch==i.kswitch&&item.title==i.title&&item.color==i.color))) {
                this.items.find(i=>(item.key==i.key&&item.image==i.image&&item.kswitch==i.kswitch&&item.title==i.title&&item.color==i.color)).quantity+=item.quantity
            }
            else {
                this.items.push(item)
            }
        });
    }
    
}
</script>

<style>
pre {
    margin:5px 0;
    padding:5px;
    white-space: pre-line;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
}
.order-detail {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.order-detail .od-total {
    margin-top:25px;
    width: 100%;
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-between;
}
.order-detail .od-des {
    width: 100%;
    margin-top:25px;
    box-shadow: 0 0 2px rgba(0,0,0,0.3);
    padding:10px;
}
.order-detail .od-title {
    width: 100%;
    background-color: orange;
    height: 45px;
    color:white;
    display: flex;
}
.order-detail .od-items {
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid gainsboro;
}
.order-detail .od-title .odt-item,.order-detail .od-items .odi-title{
    width: 60%;
    font-size: 16px;
    font-weight: bolder;
}
.order-detail .od-items .odi-title {
    border-left: 1px solid gainsboro;
}
.order-detail .od-title .odt-quantity,.order-detail .od-items .odi-quantity{
    width: 20%;
    font-weight: bolder;
    font-size: 16px;
}
.order-detail .od-title .odt-price,.order-detail .od-items .odi-price {
    width: 20%;
    font-weight: bolder;
    font-size: 16px;
}
.order-detail .od-items .odi-title,.order-detail .od-items .odi-quantity,.order-detail .od-items .odi-price {
    font-weight: unset;
    border-right: 1px solid gainsboro;
}
</style>