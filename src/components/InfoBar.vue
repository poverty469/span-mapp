<template>
  <section class="info-bar">
    <h1 class="info-bar__title">{{ activeFeature.title }}</h1>
    <hr class="info-bar__title-divider" />
    <button @click="handleTestButton">change data</button>
    <donut-chart
      class="donut-chart"
      :chart-data="{ labels, datasets }"
      :options="options"
    ></donut-chart>
    <bar-chart
      class="bar-chart"
      :chart-data="{ labels, datasets }"
      :options="options"
    ></bar-chart>
    <density-chart :classified="true"></density-chart>
  </section>
</template>
<script>
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";

export default {
  name: "InfoBar",
  components: { DonutChart, BarChart },
  props: {
    activeFeature: {
      type: Object,
      required: false,
      default: function() {
        return {
          title: "Okanagan County"
        };
      }
    }
  },
  data: function() {
    return {
      labels: ["One", "Two"],
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
      ],
      options: {
        tooltips: {
          backgroundColor: "#4B4B4BF2",
          bodyAlign: "left",
          bodyFontColor: "#fff",
          bodyFontFamily:
            "'Muli', 'Avenier', 'Open Sans', 'Helvetica Neue', sans-serif",
          bodyFontSize: 14,
          bodySpacing: 2,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          // callbacks: {beforeTitle: ƒ, title: ƒ, afterTitle: ƒ, beforeBody: ƒ, beforeLabel: ƒ, …},
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 3,
          custom: null,
          displayColors: false,
          enabled: true,
          footerAlign: "left",
          footerFontColor: "#fff",
          footerFontFamily:
            "'Muli', 'Avenier', 'Open Sans', 'Helvetica Neue', sans-serif",
          footerFontStyle: "bold",
          footerMarginTop: 6,
          footerSpacing: 2,
          intersect: true,
          mode: "nearest",
          multiKeyBackground: "#fff",
          position: "average",
          titleAlign: "left",
          titleFontColor: "#fff",
          titleFontFamily:
            "'Muli', 'Avenier', 'Open Sans', 'Helvetica Neue', sans-serif",
          titleFontSize: 14,
          titleFontStyle: "bold",
          titleMarginBottom: 6,
          titleSpacing: 2,
          xPadding: 10,
          yPadding: 10
        }
      }
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
.info-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: $righter-width;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px 7px 28px 7px; // Keeps the info button in the infobar

  background: $light-tan;
  border-left: $thin-border solid $charcoal;
  box-shadow: $standard-box-shadow;
}

.info-bar__title {
  @include char-style($info-bar-title...);
  margin: 20px 10px;
  padding: 10px;
}

.info-bar__title-divider {
  width: 100%;
  height: 2px;
  margin-bottom: 20px;
}

.donut-chart,
.bar-chart {
  top: 0;
  width: 80%;
}
</style>
