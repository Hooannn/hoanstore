<template>
  <div @click='close_' class="bill-modal center">
      <div class="bm-body">
        <div class="bmb-title center">
            <ion-icon @click='close' onMouseOver='this.style.transform="rotate(90deg)";this.style.color="orangered"' onMouseOut='this.style.transform="rotate(0)";this.style.color="gray"' style='color:gray;cursor:pointer;transition:.3s linear;position:absolute;right:5px;fontSize:30px;zIndex:5' name="close-circle-outline" class='close-icon'></ion-icon>
            <span>BILL {{$store.state.app.billKey}}</span>
            <span style='fontSize:14px;color:whitesmoke'>{{bill.date}}</span>
        </div>
        <div v-for='(item,index) in items' :key='"item"+$store.state.app.billKey+item[".key"]' class="bmb-item">
            <div class="bmbi-id center">
                {{(index+1)}}
            </div>
            <div class='bmbi-detail center'>
                <span style='fontSize:14.6px;fontWeight:bolder'>{{item.title}} x {{item.quantity}}</span>
                <span style="color:gray;fontSize:14px" v-if='item.kswitch!="none"'>Switch: {{item.kswitch|upperFirstCase}}</span>
                <span style="color:gray;fontSize:14px">Color: {{item.color|upperFirstCase}}</span>
            </div>
            <div style='paddingRight:5px;fontSize:14px;color:gray;display:flex;flexDirection:column' class="bmbi-price center">
                Price<span style='fontSize:14.5px;color:orangered;'>${{item.price}}</span>
            </div>
        </div>
        <div v-if='bill.bill.des!=undefined&&bill.bill.des.trim()!=""&&bill.bill.des!=null' style='padding:15px;' class="bmb-des">
            <span style='fontSize:14px;'>BILL DESCRIPTION</span>
            <pre style='border:2px solid gainsboro;fontSize:13.7px'>
                {{bill.bill.des}}
            </pre>
        </div>
        <div class="bmb-subtotal">
            <span style='paddingLeft:5px;fontWeight:bold'>TOTAL:</span>
            <span style='paddingRight:5px;fontWeight:bolder;color:orangered'>${{bill.bill.subtotal}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            bill:'',
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
    methods:{
        close_(e) {
            if (e.target==document.querySelector('#app>div.bill-modal')) {
                document.querySelector('#app>div.bill-modal').classList.remove('show')
                this.$store.state.app.billKey=''
            }
        },
        close() {
                this.$store.state.app.billKey=''
                document.querySelector('#app>div.bill-modal').classList.remove('show')
        }
    },
    mounted() {
        if (this.$store.state.app.billKey!=''&&this.$store.state.app.billKey!=null) {
            this.$rtdbBind('bill',db.ref('bills').child(this.$store.state.app.billKey))
            this.$rtdbBind('items',db.ref('bills').child(this.$store.state.app.billKey).child('bill').child('items'))
        }
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
.bill-modal {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    z-index:500;
    visibility: hidden;
    opacity: 0;
    transition:.1s linear;
}
.bill-modal.show {
    visibility: visible;
    opacity: 1;
}
.bill-modal .bm-body{
    width: 425px;
    background-color:white;
    box-shadow: rgba(0,0,0,0.5);
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    overflow-y:auto;
}
.bill-modal .bm-body .bmb-title {
    width: 100%;
    padding:5px 0;
    background-color:orange;
    color:white;
    position: relative;
    display: flex;
    flex-direction: column;
}
.bill-modal .bm-body .bmb-item {
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
}
.bill-modal .bm-body .bmb-item .bmbi-id{
    width: 40px;
    padding:8px 0;
    border-right:1px solid gainsboro;
}
.bill-modal .bm-body .bmb-item .bmbi-detail {
    width: 90%;
    padding:8px 0;
    display: flex;
    flex-direction: column;
}
.bill-modal .bm-body .bmb-subtotal {
    width: 100%;
    padding:10px 0;
    display: flex;
    justify-content: space-between;
}
/*  */
@media only screen and (max-height: 600px) {
    .bill-modal .bm-body {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        overflow-y:auto;
    }
}
@media only screen and (max-width: 425px) {
    .bill-modal .bm-body {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        overflow-y:auto;
    }
}
</style>