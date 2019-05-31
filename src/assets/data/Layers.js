import { MapTypes, SequentialPalettes } from "@/util/enums.js";
import geographies from "@/assets/geographies";
import povertyData from "@/assets/data/dataLayer";

const Layers = {
  percentFamiliesBelowPovertyLevel: {
    title: "below poverty",
    dataset: povertyData,
    geographyId: geographies.counties.id,
    attributeId: "HC03_VC161",
    type: MapTypes.CHOROPLETH,
    color: SequentialPalettes.RED_PURPLE
  },
  secondLayer: {
    title: "second layer",
    dataset: povertyData,
    geographyId: geographies.counties.id,
    attributeId: "HC03_VC163",
    type: MapTypes.CHOROPLETH,
    color: SequentialPalettes.GREEN
  }
};

const LayerList = Object.values(Layers);

export default { Layers, LayerList };
