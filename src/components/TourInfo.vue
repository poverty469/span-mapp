<template>
  <div>
    <div class="container">
      <div class="story-content">{{narrative}}</div>
    </div>
    <div class="container">
      <div class="tutorial-content">{{tutorial}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTourInfo",
  props: {
    narrative: {
        type: String,
        required: true
    },
    tutorial: {
      type:String,
      required: true
    }
  },
  data: function() {
    return {
    };
  },
  components: {}
};
</script>

<style lang="scss">
.story-content, .tutorial-content {
  position: relative;
  text-align: center;
}

.container {
  padding: 2rem;
  display:flex;
  justify-content: center;
}

.container .story-content {
  background-color: $dark-orange;
  border-radius: 20px;
  border: 2px solid $dark-orange;
  padding:1em;
}
</style>
