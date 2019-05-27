<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "DonutChart",
  extends: Doughnut,
  mixins: [reactiveProp],
  components: {},
  props: {
    options: {
      type: Object,
      required: false,
      default: function() {
        return {
          tooltips: {
            enabled: true,
            backgroundColor: "#faaf8f", // $dark-orange--shadow //	Color	'rgba(0, 0, 0, 0.8)'	Background color of the tooltip.
            titleFontFamily: "'Muli'", //	string	"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"	Title font.
            titleFontSize: "12px", // "0.6rem", //	number	12	Title font size.
            titleFontStyle: "bold", //	string	'bold'	Title font style.
            titleFontColor: "#e6432e", // $bright-red //	Color	'#fff'	Title font color.
            titleSpacing: "5px", //	number	2	Spacing to add to top and bottom of each title line.
            titleMarginBottom: "5px", //	number	6	Margin to add on bottom of title section.
            bodyFontFamily: '"Muli"', //	string	"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"	Body line font.
            bodyFontSize: "12px", //	number	12	Body font size.
            bodyFontStyle: "normal", //	string	'normal'	Body font style.
            bodyFontColor: "#4b4b4b", // $dark-grey//	Color	'#fff'	Body font color.
            bodySpacing: "5px" //	number	2	Spacing to add to top and bottom of each tooltip item.
          }
        };
      }
    }
  },
  data: function() {
    return {
      chart: undefined
    };
  },
  methods: {},
  computed: {},
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style lang="scss" scoped></style>
