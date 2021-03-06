import * as belowPoverty_Counties from "./selectedEconomicCharacteristics_161-180_2017_counties_summary.json";

// TODO: Add feature subtitle

export default {
  id: "percent-below-poverty",
  title: "Percent Below Poverty",
  popUpHtml: feature => {
    return `<h3 class="popup--race__title">${feature.properties.title}</h3>
    <p class="popup--race__text">${feature.properties.subtitle}</p>`;
  },
  geographies: {
    districts: undefined,
    counties: belowPoverty_Counties.default,
    heatmap: undefined
  },
  source: {
    institution: "U.S. Census Bureau",
    program: {
      name: "American Community Survey",
      title: "ACS",
      detail: "5-Year Estimates"
    },
    year: 2017
  }
};
