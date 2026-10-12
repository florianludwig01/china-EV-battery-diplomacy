export type StoryStep = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  text: string;
  takeaway: string;
  references: number[];
  activeNodeIds: string[];
  activeEdgeIds: string[];
};

export const storySteps: StoryStep[] = [
  {
    id: "origins",
    number: "01",
    eyebrow: "Geographic dispersion",
    title: "Mineral extraction creates geographically distributed dependencies.",
    text: "Electric-vehicle battery production links mineral extraction in Australia, Indonesia, the Democratic Republic of the Congo and South America to processing and component manufacturing in a smaller number of industrial locations. Resource endowment therefore constitutes only one stage of a transnational production system.",
    takeaway: "Mineral ownership does not by itself determine control over the value chain.",
    references: [1, 2],
    activeNodeIds: [
      "australia",
      "indonesia",
      "dr_congo",
      "chile",
      "argentina",
      "ganfeng",
      "huayou",
      "cmoc",
      "chinese-refining",
      "chinese-materials",
    ],
    activeEdgeIds: [
      "ganfeng-australia",
      "ganfeng-argentina",
      "huayou-indonesia",
      "cmoc-dr-congo",
      "chile-chinese-refining",
      "ganfeng-chinese-refining",
      "huayou-chinese-materials",
      "cmoc-chinese-refining",
      "australia-ganfeng",
      "argentina-ganfeng",
      "indonesia-huayou",
      "dr-congo-cmoc",
    ],
  },
  {
    id: "processing",
    number: "02",
    eyebrow: "Industrial concentration",
    title: "Industrial concentration is most consequential in the middle of the chain.",
    text: "Refining and the production of cathode and anode materials convert mineral inputs into battery-grade components. IEA assessments identify these intermediate stages as highly concentrated and therefore particularly relevant to supply security and industrial policy.",
    takeaway: "Processing capacity can generate leverage independently of domestic mineral extraction.",
    references: [1, 2],
    activeNodeIds: ["chinese-refining", "chinese-materials"],
    activeEdgeIds: ["chinese-refining-chinese-materials"],
  },
  {
    id: "manufacturing",
    number: "03",
    eyebrow: "Commercial scale",
    title: "Corporate networks connect national capacity with foreign demand.",
    text: "Cell and vehicle manufacturers mediate between upstream material production and downstream automotive markets. Overseas plants, joint ventures and long-term supply agreements embed corporate investment decisions within national strategies for industrial development and supply-chain resilience.",
    takeaway: "State influence is transmitted through, but should not be equated with, corporate activity.",
    references: [1, 2],
    activeNodeIds: [
      "china",
      "chinese-materials",
      "catl",
      "byd",
      "hungary",
      "european-automakers",
      "eu",
    ],
    activeEdgeIds: [
      "chinese-materials-catl",
      "chinese-materials-byd",
      "china-catl",
      "china-byd",
      "catl-hungary",
      "catl-european-automakers",
      "byd-hungary",
    ],
  },
  {
    id: "diplomacy",
    number: "04",
    eyebrow: "Diplomatic response",
    title: "Industrial dependence increasingly shapes regulatory and trade policy.",
    text: "China, the European Union and the United States intervene through different combinations of subsidies, market-access rules, supply-security measures and sustainability requirements. EU battery and critical-raw-material legislation illustrates how regulation can restructure conditions along an internationally organized value chain.",
    takeaway: "Battery diplomacy arises from the interaction of commercial dependence and public regulation.",
    references: [3, 4, 5],
    activeNodeIds: [
      "china",
      "catl",
      "byd",
      "hungary",
      "european-automakers",
      "eu",
      "usa",
      "wto",
      "global-battery-alliance",
    ],
    activeEdgeIds: [
      "china-catl",
      "china-byd",
      "byd-eu",
      "hungary-eu",
      "eu-european-automakers",
      "usa-european-automakers",
      "china-wto",
      "eu-wto",
      "usa-wto",
      "gba-catl",
      "gba-byd",
    ],
  },
];
