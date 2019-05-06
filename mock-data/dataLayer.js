import geographies from "../src/assets/geographies";
import stats from "./stats";

// TODO: Add feature subtitle

export default {
  id: "race",
  title: "Race/Ethnicity",
  popUpHtml: feature => {
    return `<h3 class="popup--race__title">${feature.properties.name}</h3>
    <p class="popup--race__text">${feature.properties.subtitle}</p>`;
  },
  source: {
    institution: "U.S. Census Bureau",
    program: {
      name: "American Community Survey",
      title: "ACS",
      detail: "5-Year Estimates"
    },
    year: {
      start: 2013,
      end: 2017
    }
  },
  geography: geographies.DISTRICTS,
  stats: stats
};
