export type JamoGroup = 'consonant' | 'vowel';

export type ValidationStatus =
  | 'unverified'
  | 'first_pass_checked'
  | 'conflict_found'
  | 'confirmed';

export type ValidationSource = {
  label: string;
  kind: 'workbook' | 'web' | 'internal_note';
  url?: string;
  checkedAt?: string;
};

export type ExampleWord = {
  id: string;
  word: string;
  gloss: string;
  difficulty: 'starter' | 'basic';
  highlightJamo: string;
  note?: string;
  imageKey?: string;
  audioKey?: string;
};

export type JamoValidation = {
  status: ValidationStatus;
  sources: ValidationSource[];
  notes?: string;
  reviewedAt?: string;
};

export type Stroke = {
  id: string;
  order: number;
  label: string;
  description: string;
  svgPath: string;
  start: [number, number];
  end: [number, number];
};

export type JamoItem = {
  id: string;
  char: string;
  title: string;
  group: JamoGroup;
  categoryLabel: string;
  strokeCount: number;
  learningNote: string;
  example: string;
  examples?: ExampleWord[];
  validation?: JamoValidation;
  strokes: Stroke[];
};
