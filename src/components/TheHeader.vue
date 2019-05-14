<template>
  <div>
    <the-main-menu class="the-main-menu"></the-main-menu>
  </div>
</template>

<script>
import TheMainMenu from "@/components/TheMainMenu.vue";
export default {
  name: "TheHeader",
  props: {},
  data: function() {
    return {};
  },
  components: { TheMainMenu }
};
</script>

<style lang="scss">
.the-header {
  background: $light-tan;
  box-shadow: $standard-box-shadow;
  border-bottom: $thin-border solid $charcoal;
}

.the-main-menu {
  top: 0;
  right: 0;
  position: absolute;
  width: fit-content;
  height: 100%;

  user-select: none;
}
</style>
