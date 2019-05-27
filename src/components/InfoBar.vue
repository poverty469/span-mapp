<template>
  <section class="info-bar"></section>
</template>
<script>
export default {
  name: "InfoBar",
  components: {},
  props: {}
};
</script>
<style lang="scss" scoped>
$info-bar-width: 250px;

.info-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: $info-bar-width;
  background: black;
}
</style>
