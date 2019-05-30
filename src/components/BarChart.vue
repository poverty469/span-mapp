<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "BarChart",
  extends: Bar,
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
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style lang="scss" scoped></style>
