import * as districtsGeom from "@/assets/geometry/districts";
import * as countiesGeom from "@/assets/geometry/counties";

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
    boundingBox: {
      sw: [-124.848974, 45.543541],
      ne: [-116.916071, 49.002432]
    }
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
    boundingBox: {
      sw: [-124.848974, 45.543541],
      ne: [-116.916071, 49.002432]
    }
  }
};
