<template>
  <div class="tour-info">
    <div class="container">
      <p class="story-content" v-html="narrative"></p>
    </div>
    <div class="container">
      <div class="tutorial-content" v-html="tutorial"></div>
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
.tour-info {
  width: auto;
  height: auto;
  margin-left: 4vw;
}

.tour-info .story-content, .tour-info .tutorial-content {
  position: relative;
  width: 450px;
}

.tour-info .container {
  display:flex;
  justify-content: center;
}

.tour-info .container .tutorial-content {
  top: 28px;
  padding-top: 2em;
  text-align: center;
}

.tour-info  .container .story-content {
  background-color: #fcd3c1;
  border-radius: 20px;
  border: 2px solid #fcd3c1;
  padding: 1em;
  text-align: left;
  font-size: 14px;
}

.tour-info  .container a {
  text-decoration: underline !important;
  color: $dark-purple;
}

.tour-info .container h3 {
  text-align: center !important;
  font-weight: bold;
  font-size: 24px;
}
</style>
