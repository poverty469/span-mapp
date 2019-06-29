<template>
    <div class="display-maps">
      <img :src="image" />
    </div> 
</template>
<script>
export default {
  name: "TheDisplayMaps",
  props: {
    image: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
  .display-maps {
    position: relative;
    left: 20px;
    padding: 10px;
    height: 66vh;
    border-radius: 20px;
    border: 3px solid #f28d79;
  }

  .display-maps img {
    position: relative;
    width: 60vw;
    height: 66vh;
    border-radius: 20px;
  }
</style>
