<template>
  <div class="map-legend">
    <h3 class="map-legend__title">
      {{ title }}
    </h3>
    <dl class="map-legend__item-list">
      <div
        v-for="(item, index) in legendItems"
        :key="`${title}-legend-item-${index}`"
        aria-hidden="true"
        class="map-legend__item"
      >
        <dt
          :style="{
            background: item.swatch,
            'border-color': borderColor
          }"
          class="map-legend__item__symbol"
        ></dt>
        <dd class="map-legend__item__label">
          {{ item.label }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: "MapLegend",
  props: {
    title: {
      type: String,
      required: true,
      default: function() {
        return "Legend Title, by Ratio (averaged)";
      }
    },
    legendItems: {
      type: Array,
      required: true,
      default: function() {
        return [
          { swatch: "black", label: "0.01 - 5.10" },
          { swatch: "black", label: "6 - 10" },
          { swatch: "black", label: "98 - 100" }
        ];
      }
    },
    borderColor: {
      type: String,
      required: false,
      default: function() {
        return "rgb(139, 139, 139)";
      }
    }
  },
  data: function() {
    return {};
  }
};
</script>

<style lang="scss">
$legend-max-width: 12rem;

.map-legend {
  position: relative;
  display: block;
  width: fit-content;
  height: fit-content;
  max-width: $legend-max-width;
}

.map-legend__title {
  font-size: 18px !important;
  position: relative;
  display: block;
  background: white;
  width: fit-content;
  max-width: calc(#{$legend-max-width} - 5rem);
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  @include char-style($legend-title...);
  text-transform: uppercase;
}

.map-legend__item-list {
  position: relative;
  display: block;
  width: fit-content;
  padding: 1rem;
  background: white;
}

.map-legend__item {
  display: block;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.map-legend__item:last-of-type {
  margin-bottom: 0;
}

.map-legend__item__symbol {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 1px solid transparent;
  margin-right: 0.5rem;
}

.map-legend__item__label {
  display: inline-block;
  @include char-style($legend-item-label...);
}
</style>
