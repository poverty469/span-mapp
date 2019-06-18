import { MapTypes, SequentialPalettes } from "@/util/enums";
import geographies from "@/assets/geographies";
import povertyData from "@/assets/data/dataLayer";

const tourSlideData = [
  {
    title: "Living in Poverty",
    subtitle: "By Census Tract",
    dataLayers: [
      {
        dataset: povertyData,
        geographyId: geographies.counties.properties,
        attributeId: '"HC03_VC161"',
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.GREEN
      }
    ],
    narrativeHtml: 'Although poverty rates have been falling both in Washington state and nationwide, <a target="blank_" href="https://www.kuow.org/stories/census-poverty-has-deepened">people living in poverty are getting poorer</a>. The rate of Washingtonians living below 50 percent of the Federal Poverty Line(defined by the US Census Bureau as “Deep Poverty”) has grown over the past x years.',
    tutorialHtml: "Guide coming soon!",
    imageHtml: './images/belowpov.jpg'
  },
  {
    title: 'Median Incomes',
    subtitle: 'by County',
    dataLayers: [
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: '"HC03_VC163"',
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.PURPLE_BLUE
      },
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: '"HC03_VC162"',
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.ORANGE_RED
      }
    ],
    narrativeHtml: 'Although certain sectors of our state’s economy are booming, <a target="blank_" href="http://www.opportunityinstitute.org/research/post/growing-jobs-stagnant-wages-increasing-inequality-rising-prices/wages">have not risen for everyone</a>. By many measures, Washington’s economy has soared since the Great Recession. The state has added over 400,000 jobs since 2008 – more than making up for previous losses – and average hourly wages have climbed 13 percent after adjusting for inflation. However, those rosy numbers mask the fact that sluggish wage growth, increasing inequality and rising prices are leaving many Washington residents struggling.',
    tutorialHtml: 'Guide coming soon!',
    imageHtml: './images/medIncome.jpg'
  },
  {
    title: 'Median Cost of Monthly Rent',
    subtitle: 'by County',
    dataLayers: [],
    narrativeHtml: '<a href="https://seattle.curbed.com/2018/6/14/17464900/seattle-washington-minimum-wage-housing-costs" target="blank_" >Wages have not kept pace with rapidly rising costs of living throughout the state</a>. <p>For many Washingtonians living on low or moderate wages, monthly rent costs take an unsustainable portion of their take-home pay.</p>',
    tutorialHtml: 'Guide coming soon!',
    imageHtml: './images/medRent.jpg'
  },
  {
    title: 'Statewide Poverty Action Network Four Focuses',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: '<p>In our <a href="https://povertyaction.org/listening-sessions/" target="blank_">conversations with people across the state</a>,' +
      ' it we have heard from community members that they' +
      ' struggle to meet their <a href="https://povertyaction.org/basic-needs/" target="blank_">basic needs</a>, <a href="https://povertyaction.org/consumer-protections/" target="blank_">pay off debt</a>,' +
      ' and, if they have criminal convictions, <a target="blank_" href="https://povertyaction.org/criminal-justice/">rebuild their lives</a> after leaving prison. Additionally, Washington’s' + 
      ' regressive <a target="blank_" href="https://povertyaction.org/revenue/">state tax structure</a> further exacerbates poverty. <br/> <br/>Poverty Action works to advocate for and advance progressive policy solutions that fix our state tax code, strengthen state basic needs programs, create robust consumer protections, and offer people with criminal convictions a second chance.</p>'
    ,
    tutorialHtml: '<img src="./takeAction.png" alt="Take action in Washington" width="210px" height="100px"/>',
    imageHtml: './images/fourFocuses.png'
  },
  {
    title: 'Basic Needs Use in Washington State',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: '<p>Children, families, and adults rely on our state’s safety net programs to ' +
      'help them keep housed, fed, and healthy during times of crisis. Sound investments in basic' +
      ' needs programs can ensure that those needing assistance can get the help they need while also' +
      ' setting up a path for economic stability. <br /><br /><h3><a target="blank_" href="https://povertyaction.org/basic-needs/">' +
      'Take action on basic needs programs in WA</a></h3></p>',
    tutorialHtml: 'Guide coming soon!',
    imageHtml: './images/basicNeeds.jpg'
  },
  {
    title: 'Debt in Washington State',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: '<a target="blank_" href="https://woodstockinst.org/news/press-release/enforcing-inequality-report/">Shady debt collectors and payday loan servicers disproportionately target low-income communities and Black communities</a>.' +
      ' <a target="blank_" href="https://www.propublica.org/article/debt-collection-lawsuits-squeeze-black-neighborhoods">More info is here too</a> ' +
      '<p>Often, loose consumer protections trap people in a cycle of debt that is difficult to escape. <br /><br />' +
      '<h3><a target="blank_" href="https://povertyaction.org/consumer-protections/">Take action on debt in WA</a></h3></p>',
    tutorialHtml: 'Guide coming soon!',
    imageHtml: './images/debt.jpg'
  },
  {
    title: 'Criminal Justice in Washington State',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: '<p>Our country’s broken criminal justice system, which disproportionately targets people' +
      ' from Black, Latino, and Native American communities, further upholds systems of poverty. ' +
      'Due to stigma and bias, people with criminal records often have a very difficult time finding employment' +
      ' or housing. Many end up under- or unemployed, unstably housed or homeless. <br /><br/>' +
      '<h3><a target="blank_" href="https://povertyaction.org/criminal-justice/">Take action on criminal justice in WA</a></h3></p>',
    tutorialHtml: 'Guide coming soon!',
    imageHtml: './images/homeless.jpg'
  }
  /*{
    title: 'Washington’s State Tax Code',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: '<p>For years, Washington state has had the worst tax structure in the country.' +
      ' Because Washingotn state does not have a personal or corporate income tax, we must generate' +
      ' state revenue through other means, such as a sales tax, which is the same flat fee for everyone,' +
      ' regardless of how much—or how little—they may make. In Washington, low-income people pay up to six ' +
      'times more as a share of their income in state and local taxes than the highest earners do.' +
      ' <br /><br/><h3><a target="blank_" href="">Take action on revenue in WA</a></h3></p>',
    tutorialHtml: 'Guide coming soon!',
    imageHtml: './images/'
  }**/
];

export default tourSlideData;
