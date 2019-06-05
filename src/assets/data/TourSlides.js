import { MapTypes, SequentialPalettes } from '@/util/enums';
import geographies from '@/assets/geographies';
import povertyData from '@/assets/data/dataLayer';

const tourSlideData = [
  {
    title: 'Living in Poverty',
    subtitle: '',
    dataLayers: [
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: 'HC03_VC161',
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.GREEN
      }
    ],
    narrativeHtml: 'Although poverty rates have been falling both in Washington state and nationwide, <a href="https://www.kuow.org/stories/census-poverty-has-deepened">people living in poverty are getting poorer</a>. The rate of Washingtonians living below 50 percent of the Federal Poverty Line(defined by the US Census Bureau as “Deep Poverty”) has grown over the past x years.',
    tutorialHtml: 'Guide coming soon!'
  },
  {
    title: 'Median Incomes',
    subtitle: 'by County',
    dataLayers: [
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: 'HC03_VC163',
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.PURPLE_BLUE
      },
      {
        dataset: povertyData,
        geographyId: geographies.counties.id,
        attributeId: 'HC03_VC162',
        type: MapTypes.CHOROPLETH,
        color: SequentialPalettes.ORANGE_RED
      }
    ],
    narrativeHtml: 'Although certain sectors of our state’s economy are booming, wages have not risen for everyone.',
    tutorialHtml: 'Guide coming soon!'
  },
  {
    title: 'Median Cost of Monthly Rent',
    subtitle: 'by County',
    dataLayers: [],
    narrativeHtml: '<a href="https://seattle.curbed.com/2018/6/14/17464900/seattle-washington-minimum-wage-housing-costs">Wages have not kept pace with rapidly rising costs of living throughout the state</a>.  For many Washingtonians living on low or moderate wages, monthly rent costs take an unsustainable portion of their take-home pay.',
    tutorialHtml: 'Guide coming soon!'
  },
  {
    title: 'Statewide Poverty Action Network Four Focuses',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: 'In our <a href="https://povertyaction.org/listening-sessions/">conversations with people across the state</a>, it we have heard from community members that they' +
      ' struggle to meet their <a href="https://povertyaction.org/basic-needs/">basic needs</a>, <a href="https://povertyaction.org/consumer-protections/">pay off debt</a>,' +
      ' and, if they have criminal convictions, <a href="https://povertyaction.org/criminal-justice/">rebuild their lives</a> after leaving prison. Additionally, Washington’s' + 
      ' regressive <a href="https://povertyaction.org/revenue/">state tax structure</a> further exacerbates poverty. <br/> <br/>Poverty Action works to advocate for and advance progressive policy solutions that fix our state tax code, strengthen state basic needs programs, create robust consumer protections, and offer people with criminal convictions a second chance.'
    ,
    tutorialHtml: ''
  },
  {
    title: 'Basic Needs Use in Washington State',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: 'Children, families, and adults rely on our state’s safety net programs to ' +
      'help them keep housed, fed, and healthy during times of crisis. Sound investments in basic' +
      ' needs programs can ensure that those needing assistance can get the help they need while also' +
      ' setting up a path for economic stability. <br /><br /><h3><a href="https://povertyaction.org/basic-needs/">' +
      'Take action on basic needs programs in WA</a></h3>',
    tutorialHtml: 'Guide coming soon!'
  },
  {
    title: 'Debt in Washington State',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: '<a href="https://woodstockinst.org/news/press-release/enforcing-inequality-report/">Shady debt collectors and payday loan servicers disproportionately target low-income communities and Black communities</a>.' +
      ' <a href="https://www.propublica.org/article/debt-collection-lawsuits-squeeze-black-neighborhoods">More info is here too</a> ' +
      'Often, loose consumer protections trap people in a cycle of debt that is difficult to escape. <br /><br />' +
      '<h3><a href="https://povertyaction.org/consumer-protections/">Take action on debt in WA</a></h3>',
    tutorialHtml: 'Guide coming soon!'
  },
  {
    title: 'Criminal Justice in Washington State',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: 'Our country’s broken criminal justice system, which disproportionately targets people' +
      ' from Black, Latino, and Native American communities, further upholds systems of poverty. ' +
      'Due to stigma and bias, people with criminal records often have a very difficult time finding employment' +
      ' or housing. Many end up under- or unemployed, unstably housed or homeless. <br /><br/>' +
      '<h3><a href="https://povertyaction.org/criminal-justice/">Take action on criminal justice in WA</a></h3>',
    tutorialHtml: 'Guide coming soon!'
  },
  {
    title: 'Washington’s State Tax Code',
    subtitle: '',
    dataLayers: [],
    narrativeHtml: 'For years, Washington state has had the worst tax structure in the country.' +
      ' Because Washingotn state does not have a personal or corporate income tax, we must generate' +
      ' state revenue through other means, such as a sales tax, which is the same flat fee for everyone,' +
      ' regardless of how much—or how little—they may make. In Washington, low-income people pay up to six ' +
      'times more as a share of their income in state and local taxes than the highest earners do.' +
      ' <br /><br/><h3><a href="">Take action on revenue in WA</a></h3>',
    tutorialHtml: 'Guide coming soon!'
  }
];

export default tourSlideData;
