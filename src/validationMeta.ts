import type { ValidationStatus } from './types';

export const validationMeta: Record<
  ValidationStatus,
  {
    label: string;
    shortLabel: string;
    tone: 'neutral' | 'warning' | 'confirmed';
  }
> = {
  unverified: {
    label: '검증 전',
    shortLabel: '대기',
    tone: 'neutral',
  },
  first_pass_checked: {
    label: '1차 확인',
    shortLabel: '1차',
    tone: 'neutral',
  },
  conflict_found: {
    label: '재검토 필요',
    shortLabel: '재검토',
    tone: 'warning',
  },
  confirmed: {
    label: '검증 완료',
    shortLabel: '완료',
    tone: 'confirmed',
  },
};
