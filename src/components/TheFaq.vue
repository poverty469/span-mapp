<template>
  <div class="faq-container">
    <h2>{{title}}</h2>
    <faq-QA v-for="entry of data"
        :key="entry"
        :Question="entry.question"
        :Answer="entry.answer"
    />
  </div>
</template>

<script>
import faqQA from "@/components/faqQA.vue";

export default {
  name: "TheFaq",
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true,
      default: function() {
          return []
      }
    }
  },
  data: function() {
    return {};
  },
  components: {
      faqQA
  }
};
</script>

<style lang="scss">
.faq-container {
    display: relative;
    justify-content: left;
}

.faq-container h2 {
    position: relative;
    color: $dark-purple;
    font-size: 32px;
    left: 2em;
}
</style>