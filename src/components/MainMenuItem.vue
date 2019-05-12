<template>
  <li>
    <!-- Might use router links instead of standard links -->
    <div class="menu-item-container">
      <a :href="''+ menuItem.path" >{{ menuItem.title }}</a>
    </div>
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
    return {
    }
  },
  methods: {
  },
  components: {}
};
</script>

<style lang="scss">
.menu-item-container {
  padding: 1vh 1vw 1vh 1vw;
  height: 100%;
  font-size: 32px;
  font-family: $standard-font-family;
  text-transform: uppercase;
  transition: 0.5s;
}

.menu-item-container a {
  color: $dark-purple;
}

@media (max-width: 400px) {
  .menu-item-container {
    font-size: 14px;
  }
}
</style>
