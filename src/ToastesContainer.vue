<template>
  <div class='toastes-container' style='position:fixed;bottom:40px;right:40px;zIndex:9900;pointerEvents:none'>
      <b-toast id="success" static no-close-button auto-hide>
        <div style='display:flex;flexDirection:column;boxShadow:1px 1px 3px rgba(0,0,0,0.4);padding:0;borderRadius:5px;overflow:hidden'>
            <div style='backgroundColor:rgba(0, 128, 0, 0.795);color:white;fontSize:16px'><ion-icon style='marginRight:5px' name="create-outline"></ion-icon> Success</div>
            <div style='backgroundColor:whitesmoke;color:black'>Successfully added.</div> 
        </div>
      </b-toast>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.toastes-container > * > div div{
    padding:10px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin:0;
}
</style>