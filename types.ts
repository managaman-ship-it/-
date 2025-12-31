
export enum PoetryStyle {
  WU_JU = '五言绝句',
  QI_JU = '七言绝句',
  WU_LV = '五言律诗',
  QI_LV = '七言律诗',
  SONG_CI = '宋词',
  FREE = '现代诗意 (古风)'
}

export interface PoetryResult {
  title: string;
  author: string;
  content: string[];
  style: string;
  interpretation: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  result: PoetryResult | null;
}
