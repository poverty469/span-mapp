<template>
  <li>
    <!-- Might use router links instead of standard links -->
    <a href="#">
      <div class="menu-item-container">{{ item.title }}</div>
    </a>
  </li>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: {
      default: function() {
        return {
          title: "",
          path: "",
          description: ""
        };
      },
      type: Object,
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
.menu-item-container {
  height: 100%;
}
</style>
