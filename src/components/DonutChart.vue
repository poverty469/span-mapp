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
      required: false
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
    this.renderChart(this.chartData);
  }
};
</script>

<style lang="scss" scoped></style>
