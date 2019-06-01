import LAYER_OBJECT from "@/assets/data/Layers";

const Layers = LAYER_OBJECT.LAYERS;

export const INITIATIVES = [
  {
    id: 0,
    title: "basic needs",
    layers: [Layers.percentFamiliesBelowPovertyLevel]
  },
  {
    id: 1,
    title: "criminal justice",
    layers: [Layers.secondLayer]
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
