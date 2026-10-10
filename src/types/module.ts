export interface ModuleItem {
  id: string;
  name: string;
  subtitle: string;
  number: string;
  description: string;
  iconName: 'route' | 'shieldCheck' | 'anchor' | 'chartNoAxesCombined';
  colorTheme: 'mint' | 'ocean' | 'lavender' | 'emerald';
  tags: string[];
  ctaLabel: string;
  route: string;
  highlightStat?: string;
  badge?: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: 'ship' | 'fileCheck' | 'anchor' | 'lineChart' | 'sparkles';
  detail: string;
}

export interface ProblemCard {
  number: string;
  title: string;
  description: string;
  iconName: 'databaseZap' | 'shieldAlert' | 'split';
  consequence: string;
}

export interface NoveltyFeature {
  title: string;
  subtitle: string;
  description: string;
  iconName: 'link' | 'trendingUp' | 'award' | 'users';
  tag: string;
}

export interface Stakeholder {
  role: string;
  category: string;
  description: string;
  responsibilities: string[];
  iconName: 'ship' | 'fuel' | 'anchor' | 'landmark';
  accessScope: string;
}
