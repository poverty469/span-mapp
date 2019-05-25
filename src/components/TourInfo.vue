<template>
  <div>
    <div class="container">
      <div class="story-content">hello</div>
    </div>
    <div class="tutorial-content">tester</div>
  </div>
</template>

<script>
export default {
  name: "TheTourInfo",
  props: {},
  data: function() {
    return {};
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
  padding-bottom: 7vh;
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
