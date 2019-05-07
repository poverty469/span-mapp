import * as districtsData from "./percentBelowPoverty.json";

// TODO: Add feature subtitle

export default {
  id: "percent-below-poverty",
  title: "Percent Below Poverty",
  popUpHtml: feature => {
    return `<h3 class="popup--race__title">${feature.properties.title}</h3>
    <p class="popup--race__text">${feature.properties.subtitle}</p>`;
  },
  data: {
    districts: districtsData, // stats needs to be contained within the data object?
    counties: undefined
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
