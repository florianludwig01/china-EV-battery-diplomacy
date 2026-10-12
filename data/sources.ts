export type AcademicSource = {
  id: number;
  citation: string;
  url: string;
  note: string;
};

export const academicSources: AcademicSource[] = [
  {
    id: 1,
    citation:
      "International Energy Agency (IEA) (2022): Global Supply Chains of EV Batteries. Paris: IEA.",
    url: "https://www.iea.org/reports/global-supply-chains-of-ev-batteries",
    note: "Value-chain structure, geographic concentration and supply-security risks.",
  },
  {
    id: 2,
    citation:
      "International Energy Agency (IEA) (2024): Batteries and Secure Energy Transitions. Paris: IEA.",
    url: "https://www.iea.org/reports/batteries-and-secure-energy-transitions",
    note: "Battery markets, industrial concentration, energy security and recycling.",
  },
  {
    id: 3,
    citation:
      "European Parliament and Council (2023): Regulation (EU) 2023/1542 concerning batteries and waste batteries. Official Journal of the European Union, L 191, 1–117.",
    url: "https://eur-lex.europa.eu/eli/reg/2023/1542/2023-07-28",
    note: "EU sustainability, due-diligence, information and circularity requirements.",
  },
  {
    id: 4,
    citation:
      "European Parliament and Council (2024): Regulation (EU) 2024/1252 establishing a framework for ensuring a secure and sustainable supply of critical raw materials. Official Journal of the European Union.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1252",
    note: "EU policy on critical-raw-material supply security and diversification.",
  },
  {
    id: 5,
    citation:
      "Global Battery Alliance (n.d.): Battery Passport. Brussels: Global Battery Alliance (accessed 12 October 2026).",
    url: "https://www.globalbattery.org/battery-passport/",
    note: "Supply-chain transparency, sustainability benchmarks and product-level reporting.",
  },
];
