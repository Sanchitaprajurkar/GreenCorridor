import type { ModuleItem, WorkflowStep, ProblemCard, NoveltyFeature, Stakeholder } from '../types/module';

export const MODULE_ITEMS: ModuleItem[] = [
  {
    id: 'greentwin',
    number: '01',
    name: 'GreenTwin',
    subtitle: 'SMART VOYAGE PLANNING',
    description: 'Compare voyage options, estimate fuel consumption, and evaluate projected emissions, cost, and travel time before departure.',
    iconName: 'route',
    colorTheme: 'mint',
    tags: ['Route Comparison', 'Fuel Estimation', 'Voyage Performance'],
    ctaLabel: 'Explore GreenTwin',
    route: '/greentwin',
    highlightStat: 'Dynamic speed & weather optimization',
    badge: 'Planning Layer',
  },
  {
    id: 'fueltrust',
    number: '02',
    name: 'FuelTrust',
    subtitle: 'FUEL & EMISSIONS VERIFICATION',
    description: 'Connect fuel records with supporting documents, validate submitted information, and flag inconsistencies before sustainability reporting.',
    iconName: 'shieldCheck',
    colorTheme: 'ocean',
    tags: ['Fuel Records', 'Evidence Validation', 'Audit Trail'],
    ctaLabel: 'Explore FuelTrust',
    route: '/fueltrust',
    highlightStat: 'Bunker Delivery Note (BDN) & Mass-Balance audit',
    badge: 'Verification Layer',
  },
  {
    id: 'smartdock',
    number: '03',
    name: 'SmartDock',
    subtitle: 'SMART PORT COORDINATION',
    description: 'Use voyage arrival information to evaluate berth schedules, identify operational conflicts, and recommend more efficient port coordination.',
    iconName: 'anchor',
    colorTheme: 'mint',
    tags: ['ETA Tracking', 'Berth Scheduling', 'Port Clearance'],
    ctaLabel: 'Explore SmartDock',
    route: '/smartdock',
    highlightStat: 'Just-In-Time (JIT) arrival synchronization',
    badge: 'Operations Layer',
  },
  {
    id: 'greenpulse',
    number: '04',
    name: 'GreenPulse',
    subtitle: 'SUSTAINABILITY INTELLIGENCE',
    description: 'Turn verified voyage and fuel records into emissions trends, corridor performance insights, sustainability reports, and configurable incentive recommendations.',
    iconName: 'chartNoAxesCombined',
    colorTheme: 'ocean',
    tags: ['Emissions Analytics', 'Sustainability Reports', 'Decision Support'],
    ctaLabel: 'Explore GreenPulse',
    route: '/greenpulse',
    highlightStat: 'Corridor CII & CII rating benchmarks',
    badge: 'Intelligence Layer',
  },
];

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    number: '01',
    title: 'Fragmented Data',
    description: 'Voyage, fuel, and emissions records are distributed across multiple stakeholders and proprietary siloed systems.',
    consequence: 'No unified source of truth across shipping lines, fuel suppliers, and ports.',
    iconName: 'databaseZap',
  },
  {
    number: '02',
    title: 'Limited Verifiability',
    description: 'Missing documents, inconsistent quantities, and unclear data provenance make sustainability assessments harder to trust.',
    consequence: 'Greenwashing risks and unverified paper-based bunker claims.',
    iconName: 'shieldAlert',
  },
  {
    number: '03',
    title: 'Disconnected Decisions',
    description: 'Port planning, emissions reporting, and green incentive decisions lack a consistent shared information foundation.',
    consequence: 'Missed opportunities for green berth priority, carbon credits, and green tariff incentives.',
    iconName: 'split',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Register the Voyage',
    description: 'Capture vessel details, route, cargo, departure information, and estimated arrival in GreenTwin.',
    detail: 'Vessel specs, route parameters, and baseline energy demand profile.',
    iconName: 'ship',
  },
  {
    stepNumber: '02',
    title: 'Verify Fuel and Evidence',
    description: 'Validate fuel records, submitted certificates, supporting documents, and data consistency via FuelTrust.',
    detail: 'Cross-checks bunker notes, mass balance, and certified lifecycle factors.',
    iconName: 'fileCheck',
  },
  {
    stepNumber: '03',
    title: 'Coordinate Port Operations',
    description: 'Use verified voyage information to support arrival scheduling, berth recommendations, and clearance workflows in SmartDock.',
    detail: 'Just-In-Time arrival windows minimize anchorage idle time and auxiliary emissions.',
    iconName: 'anchor',
  },
  {
    stepNumber: '04',
    title: 'Analyze Sustainability',
    description: 'Calculate emissions using documented methodologies and aggregate eligible verified records into performance indicators.',
    detail: 'Well-to-Wake (WtW) and Tank-to-Wake (TtW) accounting with full traceability.',
    iconName: 'lineChart',
  },
  {
    stepNumber: '05',
    title: 'Generate Insights & Reports',
    description: 'Present corridor metrics, audit history, sustainability reports, and configurable incentive recommendations in GreenPulse.',
    detail: 'Export auditable ESG packages and automated green tariff eligibility reports.',
    iconName: 'sparkles',
  },
];

export const NOVELTY_FEATURES: NoveltyFeature[] = [
  {
    title: 'End-to-End Corridor Integration',
    subtitle: 'Unified Single Source of Truth',
    description: 'Connect voyage planning, fuel evidence, port operations, and sustainability reporting through a shared voyage identity across international borders.',
    iconName: 'link',
    tag: 'Shared Voyage Record',
  },
  {
    title: 'Corridor-Level Intelligence',
    subtitle: 'Benchmarking & Standardized Metrics',
    description: 'Compare performance across voyages using consistent methodologies, IMO GHG metrics, and clearly defined corridor-wide baselines.',
    iconName: 'trendingUp',
    tag: 'Auditable Methodology',
  },
  {
    title: 'Policy and Incentive Readiness',
    subtitle: 'Transparent Algorithmic Evaluation',
    description: 'Evaluate configurable incentive criteria against eligible verified records and provide explainable, auditable recommendations for port tariff rebates.',
    iconName: 'award',
    tag: 'Explainable Eligibility',
  },
  {
    title: 'Multi-Stakeholder Collaboration',
    subtitle: 'Granular Role-Based Data Sovereignty',
    description: 'Support shipping companies, fuel suppliers, port authorities, and government stakeholders through role-based access and secure data-sharing rules.',
    iconName: 'users',
    tag: 'Cross-Border Governance',
  },
];

export const STAKEHOLDERS: Stakeholder[] = [
  {
    role: 'Shipping Companies',
    category: 'Vessel Operators & Charterers',
    description: 'Manage fleet voyages, log bunker receipts, and demonstrate auditable environmental excellence.',
    responsibilities: [
      'Register voyages and optimize passage plans',
      'Submit fuel records and proof of bunker delivery',
      'Review corridor sustainability ratings and carbon efficiency',
    ],
    iconName: 'ship',
    accessScope: 'Fleet-level operational records & verification logs',
  },
  {
    role: 'Fuel Suppliers & Bunkers',
    category: 'Energy & Bunkering Partners',
    description: 'Establish digital provenance for bio-blends, green methanol, and low-carbon fuels.',
    responsibilities: [
      'Submit delivery information and physical batch specs',
      'Provide sustainability certificates and chain of custody',
      'Respond to cryptographic verification requests',
    ],
    iconName: 'fuel',
    accessScope: 'Batch certificates & bunker delivery notes',
  },
  {
    role: 'Port Authorities',
    category: 'India & Singapore Port Operations',
    description: 'Synchronize Just-In-Time arrivals, schedule green berths, and coordinate shore power connection.',
    responsibilities: [
      'Review incoming vessel ETAs and clearance statuses',
      'Coordinate green berth priority and shore power allocation',
      'Access authorized voyage arrival dossiers',
    ],
    iconName: 'anchor',
    accessScope: 'Port arrival planning, berth schedules, and clearance statuses',
  },
  {
    role: 'Government & Policy Makers',
    category: 'Maritime Regulatory Bodies',
    description: 'Monitor aggregate corridor decarbonization trajectories and calibrate incentive frameworks.',
    responsibilities: [
      'Review aggregated corridor emission performance indicators',
      'Monitor data quality, verification integrity, and compliance statuses',
      'Evaluate policy scenarios and green corridor incentive funding',
    ],
    iconName: 'landmark',
    accessScope: 'Anonymized macro-level corridor analytics and policy modeling',
  },
];
