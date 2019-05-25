import { MapTypes, SequentialPalettes } from "@/util/enums";
import geographies from "@/assets/geographies";
import povertyData from "@/assets/data/dataLayer";

const tourSlideData = [
  {
    title: "Test Slide Title",
    subtitle: "Test subtitle",
    dataLayers: [
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: "HC03_VC161",
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.GREEN
      }
    ],
    narrativeHtml: () => {
      return;
      ```
        <p>
            <a href="https://povertyaction.org/listening-sessions/*" target="_blank"
                In our conversations with people across the stat
            </a>
            , we have heard from community members that they struggle to meet their 
            <a href="https://povertyaction.org/basic-needs/" target"_blank">
                basic needs
            </a>
            , 
            <a href="https://povertyaction.org/consumer-protections/" target"_blank">
                pay off debt
            </a>
            , and if they have criminal convictions, 
            <a href="https://povertyaction.org/criminal-justice/" target"_blank">
                rebuild their lives
            </a>
             after leaving prison. Additionally, Washington's regressive 
             <a href="https://povertyaction.org/revenue/" target"_blank">
                state tax structure
            </a>
             further exacerbates poverty.
        </p>
        <p>
            Poverty Action works to advocate for and advance progressive policy solutions that fix our state tax code, strengthen state basic needs programs, create robust consumer protections, and offer people with criminal convictions a second chance.
        </p>
        ```;
    },
    tutorialHtml: () => {
      return;
      ```
        <p>
          Poverty Action works to advocate for and advance progressive policy solutions that fix our state tax code.
        </p>

        <p>
          Try this thing over there.
        </p>
      ```;
    }
  },
  {
    title: "Living in Poverty",
    subtitle: "",
    dataLayers: [
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: "HC03_VC163",
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.PURPLE_BLUE
      },
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: "HC03_VC162",
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.ORANGE_RED
      }
    ],
    narrativeHtml: () => {
      return "Although poverty rates have been falling both in Washington state and nationwide, ";
    },
    tutorialHtml: "Try out this thing"
  },
  {
    title: "Median Incomes",
    subtitle: "by County",
    dataLayers: [],
    narrativeHtml: () => {
      return "<p>Although certain sectors of our state’s economy are booming, wages have not risen for everyone.</p>";
    },
    tutorialHtml: "<p>Try out that thing</p><p>Then try out that thing</p>"
  },
  {
    title: "Median Cost of Monthly Rent",
    subtitle: "by County",
    dataLayers: [],
    narrativeHtml: () => {
      return ```
        <p>
            <a href="https://seattle.curbed.com/2018/6/14/17464900/seattle-washington-minimum-wage-housing-costs" target="_blank">
                Wages have not kept pace with rapidly rising costs of living throughout the state
            </a>
            . For many Washingtonians living on low or moderate wages, monthly rent costs take an unsustainable portion of their take-home pay.
        </p>
        ```;
    },
    tutorialHtml: "<p>Try out that thing</p><p>Then try out that thing</p>"
  },
  {
    title: "Listening Sessions",
    narrativeHtml: () => {
      return;
      ```
        <p>
            <a href="https://povertyaction.org/listening-sessions/*" target="_blank"
                In our conversations with people across the stat
            </a>
            , we have heard from community members that they struggle to meet their 
            <a href="https://povertyaction.org/basic-needs/" target"_blank">
                basic needs
            </a>
            , 
            <a href="https://povertyaction.org/consumer-protections/" target"_blank">
                pay off debt
            </a>
            , and if they have criminal convictions, 
            <a href="https://povertyaction.org/criminal-justice/" target"_blank">
                rebuild their lives
            </a>
             after leaving prison. Additionally, Washington's regressive 
             <a href="https://povertyaction.org/revenue/" target"_blank">
                state tax structure
            </a>
             further exacerbates poverty.
        </p>
        <p>
            Poverty Action works to advocate for and advance progressive policy solutions that fix our state tax code, strengthen state basic needs programs, create robust consumer protections, and offer people with criminal convictions a second chance.
        </p>
        ```;
    }
  }
];

export default tourSlideData;
