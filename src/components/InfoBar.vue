<template>
  <section class="info-bar">
    <button @click="handleTestButton">test button</button>
    <donut-chart
      class="donut-chart"
      :chart-data="{ labels, datasets }"
    ></donut-chart>
    <bar-chart class="bar-chart" :chart-data="{ labels, datasets }"></bar-chart>
    <density-chart :classified="true"></density-chart>
  </section>
</template>
<script>
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";

export default {
  name: "InfoBar",
  components: { DonutChart, BarChart },
  props: {},
  data: function() {
    return {
      labels: ["one", "two"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [this.getRandomInt(), this.getRandomInt()]
        },
        {
          label: "Data Two",
          backgroundColor: "#f87979",
          data: [this.getRandomInt(), this.getRandomInt()]
        }
      ]
    };
  },
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    handleTestButton() {
      this.datasets.pop();
      this.datasets.pop();

      this.datasets.push({
        label: "Data One",
        backgroundColor: "#f87979",
        data: [this.getRandomInt(), this.getRandomInt()]
      });
      this.datasets.push({
        label: "Data Two",
        backgroundColor: "#f87979",
        data: [this.getRandomInt(), this.getRandomInt()]
      });
    }
  }
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

  display: flex;
  flex-direction: column;
  align-items: center;

  background: $light-tan;
  border-left: $thin-border solid $charcoal;
  box-shadow: $standard-box-shadow;
}

.donut-chart,
.bar-chart {
  top: 0;
  width: 80%;
}
</style>
