export type JamoGroup = 'consonant' | 'vowel';

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
  strokes: Stroke[];
};
