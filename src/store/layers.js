export default {
    namespaced: false,
    state: {
        activeLayers: new Set(),
        layers: null
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
        }
    }
};
