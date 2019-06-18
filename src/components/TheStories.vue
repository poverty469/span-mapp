<template>
  <div class="story-container">
    <h1>{{name}}, {{city}}</h1>
    <div class="bio-container">
      <img :src="image" alt="Bio Image">
      <p v-html="bio"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheStories",
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss">
  .story-container {
    margin: auto;
    width: 70%;
    padding: 2vw;
  }

  h1 {
    color: $light-purple;
  }

  .bio-container {
    margin-top: 2vh;
    display: flex;
    justify-content: space-evenly;
  }

  .bio-container img {
    border-radius: 40px;
  }
  
  .bio-container p a {
    text-decoration: underline !important;
    color: $dark-purple;
  }

  .bio-container p {
    color: $light-orange;
    font-size: 24px;
    margin: auto;
    width: 50%;
  }
</style>