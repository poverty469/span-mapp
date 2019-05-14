<template>
  <li>
    <!-- Might use router links instead of standard links -->
    <a class="menu-item__click-area" :href="menuItem.path">
      <div class="menu-item__text-container">
        <p class="menu-item__text">{{ menuItem.title }}</p>
      </div>
    </a>
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
          path: "#",
          description: ""
        };
      },
      type: Object
    }
  },
  data: function() {
    return {};
  },
  methods: {},
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
  @include char-style($menu-item...);
  text-transform: uppercase;
  transition: 0.5s;
}

.menu-item__text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 0.8rem;
}

@media (max-width: 400px) {
  .menu-item__click-area {
    font-size: 14px;
  }
}
</style>
