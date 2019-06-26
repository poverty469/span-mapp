<template>
  <div class="the-faq-view">
    <h1>Frequently Asked Questions</h1>
    <the-faq v-for="data of Faq"
      :key="data"
      :title="data.title"
      :data="data.data"></the-faq>
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
  margin-bottom: $footer-height + 10px;
}

.the-faq-view h1 {
  text-align: center;
  font-size: 40px;
  margin: 5vh;
  color: $dark-grey;
}
</style>
