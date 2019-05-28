<template>
  <section class="info-bar">
    <button @click="handleTestButton">test button</button>
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
          // enabled: true,
          // backgroundColor: "#faaf8f", // $dark-orange--shadow //	Color	'rgba(0, 0, 0, 0.8)'	Background color of the tooltip.
          // titleFontFamily: "'Muli'", //	string	"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"	Title font.
          // titleFontSize: "12px", // "0.6rem", //	number	12	Title font size.
          // titleFontStyle: "bold", //	string	'bold'	Title font style.
          // titleFontColor: "#e6432e", // $bright-red //	Color	'#fff'	Title font color.
          // titleSpacing: "5px", //	number	2	Spacing to add to top and bottom of each title line.
          // titleMarginBottom: "5px", //	number	6	Margin to add on bottom of title section.
          // bodyFontFamily: '"Muli"', //	string	"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"	Body line font.
          // bodyFontSize: "12px", //	number	12	Body font size.
          // bodyFontStyle: "normal", //	string	'normal'	Body font style.
          // bodyFontColor: "#4b4b4b", // $dark-grey//	Color	'#fff'	Body font color.
          // bodySpacing: "5px" //	number	2	Spacing to add to top and bottom of each tooltip item.
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
  //   width: $righter-width;

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
