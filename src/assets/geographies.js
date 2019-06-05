import * as districtsGeom from "@/assets/geometry/districts";
import * as countiesGeom from "@/assets/geometry/counties";
import * as washingtonGeom from "@/assets/geometry/washington";

// ID MUST MATCH PROPERTY NAME
export default {
  districts: {
    id: "districts",
    title: "Legislative Districts",
    source: {
      title: "U.S. Census Bureau, Geography Division",
      year: 2018,
      url:
        "https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2018&layergroup=State+Legislative+Districts"
    },
    geometry: districtsGeom.default,
    bounds: [[-124.848974, 45.543541], [-116.916071, 49.002432]]
  },
  counties: {
    id: "counties",
    title: "Counties",
    source: {
      title: "U.S. Census Bureau, Geography Division",
      year: 2018,
      url:
        "https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2018&layergroup=Counties+%28and+equivalent%29"
    },
    geometry: countiesGeom.default,
    bounds: [[-124.848974, 45.543541], [-116.916071, 49.002432]]
  },
  washington: {
    id: "washington",
    title: "Washington",
    source: {
      title: "U.S. Census Bureau, Geography Division",
      year: 2018,
      url:
        "https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2018&layergroup=Counties+%28and+equivalent%29"
    },
    geometry: washingtonGeom.default,
    bounds: [[-124.848974, 45.543541], [-116.916071, 49.002432]]
  }
};
