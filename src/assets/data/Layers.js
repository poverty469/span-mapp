import { MapTypes, SequentialPalettes } from "@/util/enums.js";
import geographies from "@/assets/geographies";
import povertyData from "@/assets/data/dataLayer";

const layers = {
  percentFamiliesBelowPovertyLevel: {
    title: "families below poverty",
    dataset: povertyData,
    geographyId: geographies.counties.id,
    attributeId: "HC03_VC161",
    type: MapTypes.CHOROPLETH,
    color: SequentialPalettes.RED_PURPLE
  },
  percentPopulationBelowPovertyLevel: {
    title: "population below poverty",
    dataset: povertyData,
    geographyId: geographies.counties.id,
    attributeId: "HC03_VC176",
    type: MapTypes.CHOROPLETH,
    color: SequentialPalettes.GREEN
  }
};

const layerList = Object.values(layers);

export default { LAYERS: layers, LAYERLIST: layerList };
