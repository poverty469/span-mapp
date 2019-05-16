<template>
  <li>
    <!-- Might use router links instead of standard links -->
    <router-link
      class="menu-item__click-area"
      :to="menuItem.path"
      @click.native="handleMenuItemClick"
    >
      <div class="menu-item__text-container">
        <p class="menu-item__text">{{ menuItem.title }}</p>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "MainMenuItem",
  props: {
    menuItem: {
      default: function() {
        return {
          title: "",
          path: "/",
          description: ""
        };
      },
      type: Object
    }
  },
  data: function() {
    return {};
  },
  methods: {
    handleMenuItemClick() {
      this.$emit("menuItemClicked");
    }
  },
  components: {}
};
</script>

<style lang="scss">
.menu-item__click-area {
  width: fit-content;
  height: fit-content;
}

.menu-item__text-container {
  color: $dark-purple;
  height: 100%;
  width: 100%;
  text-transform: uppercase;
  transition: 0.5s;
}

.menu-item__text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 0.8rem;
  @include char-style($menu-item...);
}

@media (max-width: 400px) {
  .menu-item__click-area {
    font-size: 14px;
  }
}
</style>
