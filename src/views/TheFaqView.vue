<template>
  <div class="the-faq-view">
    <h1>Frequently Asked Questions</h1>
    <the-faq v-for="data of Faq"
      :key="data"
      :title="data.title"
      :data="data.data"></the-faq>

    <div class="shadow">
      <div class="contact-container">
          <div class="contact">
            <h1>Got More Questions?</h1>
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
import TheFaq from "@/components/TheFaq.vue";
import Faq from "@/assets/data/faq.js";

export default {
  name: "TheFaqView",
  props: {},
  data: function() {
    return {
      Faq: Faq
    };
  },
  components: {
    TheFaq
  }
};
</script>

<style lang="scss">
.the-faq-view {
  background: rgb(255, 255, 255);
  position: relative;
  margin-top: 1px;
  margin-bottom: $footer-height + 1px;
}

.the-faq-view h1 {
  text-align: center;
  font-size: 40px;
  margin: 5vh;
  color: $dark-grey;
}

  .the-faq-view .contact {
    position: relative;
    left: 3vw;
  }

  .the-faq-view .contact-container {
    background: #192930;
    padding: 5em;
    margin-top: 10vh;
    display:flex;
    justify-content: space-between;
  }

  .the-faq-view .contact button {
    margin: 1.5vh 0em 0em 6vw;
    padding: 0.5em;
  }

  .the-faq-view .address h3 {
    margin: 0vh 0em 0em 10vw;
  }

  .the-faq-view .address {
    position: relative;
    right: 3vw;
  }
</style>
