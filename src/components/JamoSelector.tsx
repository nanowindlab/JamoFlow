import { groupMeta } from '../data/jamoData';
import type { JamoGroup, JamoItem } from '../types';
import { validationMeta } from '../validationMeta';

type JamoSelectorProps = {
  activeGroup: JamoGroup;
  activeItemId: string;
  onGroupChange: (group: JamoGroup) => void;
  onItemSelect: (itemId: string) => void;
  items: JamoItem[];
};

export function JamoSelector({
  activeGroup,
  activeItemId,
  onGroupChange,
  onItemSelect,
  items,
}: JamoSelectorProps) {
  const consonants = items.filter((item) => item.group === 'consonant');
  const vowels = items.filter((item) => item.group === 'vowel');

  return (
    <aside className="selector-panel">
      <div className="group-switch">
        {(['consonant', 'vowel'] as const).map((group) => (
          <button
            key={group}
            type="button"
            className={group === activeGroup ? 'switch-chip active' : 'switch-chip'}
            onClick={() => onGroupChange(group)}
          >
            {groupMeta[group].label}
          </button>
        ))}
      </div>

      <div className="selector-copy">
        <p className="selector-title">{groupMeta[activeGroup].label}</p>
        <p className="selector-subtitle">{groupMeta[activeGroup].subtitle}</p>
      </div>

      <div className="selector-legend">
        <span className="legend-chip legend-chip--confirmed">완료</span>
        <span className="legend-chip legend-chip--neutral">1차</span>
        <span className="legend-chip legend-chip--warning">재검토</span>
      </div>

      <div className="selector-grid">
        {(activeGroup === 'consonant' ? consonants : vowels).map((item) => {
          const meta = validationMeta[item.validation?.status ?? 'unverified'];

          return (
            <button
              key={item.id}
              type="button"
              className={item.id === activeItemId ? 'jamo-chip active' : 'jamo-chip'}
              onClick={() => onItemSelect(item.id)}
            >
              <span>{item.char}</span>
              <em
                className={`chip-status chip-status--${item.validation?.status ?? 'unverified'}`}
              >
                {meta.shortLabel}
              </em>
              <small>{item.strokeCount}획</small>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
