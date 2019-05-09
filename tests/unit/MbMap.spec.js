import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import MbMap from "@/components/MbMap.vue";

// mapbox-gl/dist/mapbox-gl
jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    addSource: jest.fn(),
    fitBounds: jest.fn(),
    getCanvas: jest.fn(),
    setFeatureState: jest.fn()
  })),
  NavigationControl: jest.fn(),
  AttributionControl: jest.fn(),
  ScaleControl: jest.fn(),
  Popup: jest.fn()
}));

const localVue = createLocalVue();

localVue.use(Vuex);

describe("MbMap.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      mapFocusPadding: () => {
        return {
          top: 100,
          right: 100,
          bottom: 100,
          left: 100
        };
      }
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("does not allow mixed geographies", () => {
    const wrapper = shallowMount(MbMap, {
      propsData: {
        mapId: "test",
        activeData: [
          {
            dataset: {},
            geography: "districts"
          }
          // {
          //   dataset: {},
          //   geography: "counties"
          // }
        ]
      },
      store,
      localVue
    });
    console.log("wrapper text...", wrapper.text());
    // expect(wrapper.text()).toMatch(msg);)
  });
});
