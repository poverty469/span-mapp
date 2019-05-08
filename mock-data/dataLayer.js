import * as povertyDistrictsData from "./percentBelowPoverty_districts.json";

// TODO: Add feature subtitle

export default {
  id: "percent-below-poverty",
  title: "Percent Below Poverty",
  popUpHtml: feature => {
    return `<h3 class="popup--race__title">${feature.properties.title}</h3>
    <p class="popup--race__text">${feature.properties.subtitle}</p>`;
  },
  geographies: {
    districts: {
      data: povertyDistrictsData,
      classBreaks: [] // TODO: where should the classbreaks be stored? with the data?
    }, // stats needs to be contained within the data object?
    counties: undefined,
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
