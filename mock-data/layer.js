import stats from "./stats";
import * as legislativeGeometry from "./lang_005_7";

export default {
  name: "Race",
  title: "Race/Ethnicity",
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
  spatialUnit: "districts",
  boundingBox: {
    sw: [-124.848974, 45.543541],
    ne: [-116.916071, 49.002432]
  },
  geometry: legislativeGeometry.default,
  // "geometry": {
  //     "type": "FeatureCollection",
  //     "name": "TIGERLINE_2018_Washington_LegislativeDistricts_Upper",
  //     "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4269" } },
  //     "features": [{}] // Create schemas with general attribute titles for all data
  // },
  stats: stats
};
