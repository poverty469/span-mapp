<template>
  <div class="story-container">
    <h1>{{name}} - {{city}}</h1>
    <div class="bio-container">
      <div v-if="image !== ''">
        <img :src="image" alt="Bio Image">
      </div>
      <div class="paragraph-container">
        <p v-html="bio"></p>
      </div>
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
    margin: 3em;
    padding: 1.5em;
  }

  h1 {
    font-weight: bold;
    color: $dark-purple;
    text-emphasis: 1em;
  }

  .bio-container {
    margin-top: 2vh;
    display: flex;
    justify-content: space-evenly;
  }

  .bio-container img {
    border-radius: 100%;
    box-shadow: 0px 10px 10px 2px rgba(34, 34, 33, 0.418);
  }
  
  .paragraph-container {
    padding-left: 3em;
  }

  .bio-container p a {
    text-decoration: underline !important;
    color: $dark-orange--border;
  }

  .bio-container p {
    position: relative;
    top: 3vh;
    color: $dark-grey;
    font-size: 24px;
  }

  @media only screen and (max-width: 1100px) {
    .bio-container img {
      width: 220px;
      height: 200px;
    }
  }
</style>