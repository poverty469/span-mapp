<template>
  <div class="the-stories-view">
    <the-stories v-for="story of Stories"
      :key="story"
      :name="story.name"
      :image="story.image"
      :city="story.city"
      :bio="story.bio"
    >
    </the-stories>
    <div class="shadow">
      <div class="contact-container">
          <div class="contact">
            <h1>Want To Share Your Story?</h1>
            <button onclick="window.open('mailto:adriana@povertyaction.org?subject=Share My Story');">message us</button>
          </div>
          <div class="address">
            <h1>Statewide Poverty Action Network</h1>
            <h3>1501 North 45th Street <br/><br/>
                Seattle, WA 98103</h3>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheStories from "@/components/TheStories.vue";
import Stories from "@/assets/data/stories.js";

export default {
  name: "TheStoriesView",
  props: {},
  data: function() {
    return {
      Stories: Stories
    };
  },
  components: {
    TheStories
  }
};
</script>

<style lang="scss">
  .the-stories-view {
    background: rgb(255, 254, 254);
    position: relative;
    margin-top: 1px;
    margin-bottom: $footer-height + 1px;
  }

  .the-stories-view .contact {
    position: relative;
    left: 3vw;
  }

  .the-stories-view .contact-container {
    background: #192930;
    padding: 5em;
    margin-top: 10vh;
    display:flex;
    justify-content: space-between;
  }

  .the-stories-view .contact button {
    margin: 6vh 0em 0em 5vw;
    padding: 0.5em;
  }

  .the-stories-view .address h3 {
    margin: 3vh 0em 0em 7vw;
  }

  .the-stories-view .address {
    position: relative;
    right: 3vw;
  }

  @media only screen and (max-width: 1100px) {
    
    .the-stories-view .contact {
      position: relative;
      left: 0vw;
    }

    .the-stories-view .address {
      position: relative;
      right: 0vw;
      left: 8vw;
    }
    
    .the-stories-view .contact h1 {
      position: relative;
      right: 2vw;
    }

    .the-stories-view .contact button {
      margin: 6vh 0em 0em 3vw;
      padding: 0.5em;
    }
    
    .the-stories-view .address h3 {
      margin: 5vh 0em 0em 5vw;
    }
  }
</style>
