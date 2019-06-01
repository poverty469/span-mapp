import LAYER_OBJECT from "@/assets/data/Layers";

const Layers = LAYER_OBJECT.LAYERS;

export const INITIATIVES = [
  {
    id: 0,
    title: "basic needs",
    layers: [
      Layers.percentFamiliesBelowPovertyLevel,
      Layers.percentPopulationBelowPovertyLevel
    ]
  },
  {
    id: 1,
    title: "criminal justice",
    layers: []
  },
  {
    id: 2,
    title: "state revenue",
    layers: []
  },
  {
    id: 3,
    title: "consumer protection",
    layers: []
  }
];
