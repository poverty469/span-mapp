<template>
    <div class="container">
        <div class="display-maps">
            <img :src="image" />
        </div>
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
.container {
    position: relative;
    left: 20px;
}

.display-maps {
    padding: 1em 1em 1em 1em;
    border-radius: 20px;
    border: 3px $dark-orange--border solid;
}

.display-maps img {
    position: relative;
    width: 1190px;
    height: 760px;
    bottom: 5px;
    border-radius: 20px;
}
</style>
