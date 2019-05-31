import LayersDb from "@/assets/data/Layers";

const Layers = LayersDb.Layers;

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

console.log(INITIATIVES);
