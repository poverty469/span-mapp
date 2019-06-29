<template>
  <div class="the-about-view">
    <div>
      <the-about></the-about>
    </div>
    <div class="shadow">
      <div class="contact-container">
          <div class="contact">
            <h1>Get In Touch</h1>
            <button onclick="window.open('mailto:info@povertyaction.org?subject=Questions');">message us</button>
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
import TheAbout from "@/components/TheAbout.vue";
export default {
  name: "TheAboutView",
  props: {},
  components: {
    TheAbout
  },
  data: function() {
    return {};
  }
};
</script>

<style lang="scss">
  .the-about-view {
    position:relative;
    margin-bottom: $footer-height + 1px;
    background: rgb(255, 255, 255);
    margin-top: 1px;
  }

  .the-about-view .contact {
    position: relative;
    left: 3vw;
  }

  .the-about-view .contact h1 {
    margin-left: 3.4vw;
  }

  .the-about-view .contact-container {
    background: #192930;
    padding: 5em;
    margin-top: 10vh;
    display:flex;
    justify-content: space-between;
  }

  .the-about-view .contact button {
    margin: 6vh 0em 0em 3.8vw;
    padding: 0.5em;
  }

  .the-about-view .address h3 {
    margin: 5vh 0 0 10vw;
  }

  .the-about-view .address {
    position: relative;
    right: 3vw;
  }
</style>
