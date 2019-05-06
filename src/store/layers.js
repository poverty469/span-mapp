import Vue from "vue";
import api from "@/util/api.js";

import districts from "@/../mock-data/districts_id";

export default {
  namespaced: false,
  state: {
    activeLayers: new Set(),
    layers: null,
    geometries: []
  },
  mutations: {
    activateLayer(state, layer) {
      state.activeLayers.add(layer);
    },
    deactivateLayer(state, layer) {
      state.activeLayers.remove(layer);
    },
    resetActiveLayers(state) {
      state.activeLayers.clear();
    },
    addGeometry(state, payload) {
      let geometries = state.geometries;
      geometries.push(payload);
      Vue.set(state, "geometries", geometries);
    }
  },
  actions: {
    activateLayerGroup(context, layers) {
      context.commit("resetActiveLayers");
      for (let layer of layers) {
        context.commit("activateLayer", layer);
      }
    },
    activateLayer(context, layer) {
      context.commit("activateLayer", layer);
    },
    deactivateLayer(context, layer) {
      context.commit("deactivateLayer", layer);
    },
    async getMapboxGeometry(context, name) {
      const geom = await api.getFeatures(name);
      context.commit("addGeometry", { name, geom });
    },
    initLayerData(context) {
      context.commit("addGeometry", {
        name: "LegislativeDistricts",
        geom: districts
      });
    }
  },
  getters: {
    getGeometry: state => name => {
      let geometry = state.geometries.find(geometry => {
        return geometry.name == name;
      });
      if (geometry) {
        return geometry.geom;
      } else {
        console.error(`Geometry name '${name}' does not exist in the store.`);
      }
    },
    totalGeometries: state => {
      return state.geometries.length;
    }
  }
};
