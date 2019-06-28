<template>
  <a
    :href="urlLink"
    class="action-button__click-area"
    :class="{ 'action-button--disabled': urlLink == '' }"
    target="_blank"
  >
    <div class="action-button__container">
      <div class="action-button__text">{{ text }}</div>
    </div>
  </a>
</template>
<script>
export default {
  name: "ActionButton",
  props: {
    text: {
      type: String,
      required: true
    },
    urlLink: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style lang="scss">
.action-button__container {
  position: relative;
  width: fit-content;

  border: 2px solid $bright-red;
  border-radius: 3px;

  user-select: none;
}

.action-button__container:hover {
  background: $dark-orange;
}

.action-button__container:active {
  background: $dark-orange--shadow;
}

.action-button__text {
  position: relative;
  text-align: center;
  padding: 0 0.5rem;
  @include char-style($action-button...);
  letter-spacing: 1px;
  left: 1px; // Compensates an offset from the letter-spacing

  text-transform: uppercase;
}

.action-button--disabled {
  pointer-events: none;
  cursor: pointer;
}
</style>
