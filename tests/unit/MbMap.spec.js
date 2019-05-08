import { shallowMount } from "@vue/test-utils";
import MbMap from "@/components/MbMap.vue";

describe("MbMap.vue", () => {
  it("does not allow mixed geographies", () => {
    const wrapper = shallowMount(MbMap, {
      propsData: {
        mapId: "test",
        activeData: [
          {
            theme: {},
            geography: "districts"
          },
          {
            theme: {},
            geography: "counties"
          }
        ]
      }
    });
    console.log(wrapper.options);
    // expect(wrapper.text()).toMatch(msg);
  });
});
