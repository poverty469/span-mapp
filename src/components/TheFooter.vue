<template>
  <div class="the-footer">  
      <a href="https://www.instagram.com/poverty_action/" target="_blank"><img src="@/assets/instagram_icon.svg" class="icon"/> </a>
      <a href="https://twitter.com/PovertyActionWA" target="_blank"><img src="@/assets/twitter_icon.svg" class="icon1"/> </a>
      <a href="https://www.facebook.com/PovertyAction" target="_blank"><img src="@/assets/facebook_icon.svg" class="icon2"/> </a>
      <img src="@/assets/Untitled-11.png" class="takeaction"/>
  </div> 
</template>

<script>
export default {
  name: "TheFooter",
  props: {},
  data: function() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
.the-footer {
  position: absolute;
  background: #fff6f2;
  height: 40px !important;
  width: 100vw;
  bottom: 0;
  left: 0;
  z-index: 2;
  border-top: 3px solid #fcd3c1;
  .icon {
    height: 25px;
    width: 25px;
    margin-top: 2px;
    margin-left: 18px;
    margin-right: 10px;
  }
  .icon1 {
    height: 23px;
    width: 29px;
    margin-top: 2px;
    margin-left: 12px;
    margin-right: 10px;
  }
  .icon2 {
    height: 25px;
    width: 20px;
    margin-top: 4px;
    margin-left: 8px;
  }
  .takeaction {
    margin-top: 5px;
    margin-left: 980px;
  }
}
</style>
