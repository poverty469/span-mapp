<template>
  <div class="qa-container">
      <div class= "flex-container">
        <div class="q-line">
            <h3 class="question">Q.</h3>
        </div>
        <p v-html="Question"></p>
      </div>
      <div class= "flex-container">
        <div class="a-line">
            <h3 class="answer">A.</h3>
        </div>
        <p class="a-paragraph" v-html="Answer"></p>
      </div>
  </div>
</template>

<script>
export default {
  name: "faqQA",
  props: {
    Question: {
      type: String,
      required: true
    },
    Answer: {
      type: Array,
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
.qa-container {
    position:relative;
    padding: 1em;
}

h3 {
    font-size: 40px;
    margin: 2vh;
}

.a-line {
    position: relative;
    padding: 0.1px 0px 0.1px 0px;
    left: 5em;
    border-left: 5px solid $charcoal;
}

.a-line .answer {
    color: $charcoal;
    font-weight: bold;
}

.q-line {
    position: relative;
    border-left: 5px solid $light-purple;
    padding: 0.1px 0px 0.1px 0px;
    left: 5em;
}

.q-line .question {
    color: $light-purple;
    font-weight: bold;
}

.flex-container {
    display: flex;
    flex-wrap: nowrap;
}

.flex-container p {
    position: relative;
    top: 3vh;
    left: 5vw;
    font-size: 28px;
}

.flex-container .a-paragraph {
    color: $charcoal;
    font-size: 24px;
    top: 3.3vh;
}

.flex-container a {
    color: $dark-purple;
}
</style>