export default {
    namespaced: false,
    state: {
        inProgress: false,
        currentPhase: null
    },
    mutations: {
        setInProgress(state, val) {
            state.inProgress = val;
        },
        setCurrentPhase(state, phase) {
            state.currentPhase = phase;
        }
    },
    actions: {
        startStory(context) {
            context.commit("setInProgress", true);
            context.commit("setCurrentPhase", {});
        },
        pauseStory(context) {
            context.commit("setInProgress", false);
        },
        endStory(context) {
            context.commit("setInProgress", false);
            context.commit("currentPhase", null);
        }
    }
};
