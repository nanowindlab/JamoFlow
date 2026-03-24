import { useState } from 'react';
import type { JamoItem } from '../types';

type StrokeWorkbookProps = {
  item: JamoItem;
  onContinueToWriting?: () => void;
};

function MiniGlyph({ item, visibleCount }: { item: JamoItem; visibleCount: number }) {
  return (
    <svg className="workbook-glyph" viewBox="0 0 120 120" aria-hidden="true">
      <rect x="8" y="8" width="104" height="104" rx="18" className="workbook-outline" />
      <text x="60" y="78" className="workbook-watermark">
        {item.char}
      </text>
      {item.strokes.slice(0, visibleCount).map((stroke) => (
        <path
          key={stroke.id}
          d={stroke.svgPath}
          className="workbook-stroke"
          pathLength={100}
        />
      ))}
    </svg>
  );
}

export function StrokeWorkbook({ item, onContinueToWriting }: StrokeWorkbookProps) {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const cells = Array.from({ length: 6 }, (_, index) => index + 1);
  const previewLimit = showAllSteps ? 6 : 3;

  return (
    <section className="workbook-card">
      <div className="section-title">
        <div>
          <p className="eyebrow">워크북 스타일</p>
          <h3>단계별 따라 쓰기</h3>
        </div>
        <div className="workbook-header-actions">
          <span>{item.strokeCount}칸 활용</span>
          <button type="button" className="flow-button" onClick={() => setShowAllSteps((current) => !current)}>
            {showAllSteps ? '간단히 보기' : '더 보기'}
          </button>
        </div>
      </div>

      <div className="workbook-grid">
        {cells.map((cell) => (
          <div key={`preview-${cell}`} className="workbook-cell">
            {cell <= item.strokeCount && cell <= previewLimit ? (
              <>
                <div className="workbook-step">Step {cell}</div>
                <MiniGlyph item={item} visibleCount={cell} />
              </>
            ) : (
              <div className="workbook-empty" />
            )}
          </div>
        ))}

        {cells.map((cell) => (
          <div key={`practice-${cell}`} className="workbook-cell workbook-cell--blank">
            <span className="practice-label">
              {cell === 1 && cell <= previewLimit ? '직접 써 보기' : ''}
            </span>
          </div>
        ))}
      </div>

      {onContinueToWriting ? (
        <div className="flow-actions">
          <button type="button" className="flow-button flow-button--strong" onClick={onContinueToWriting}>
            직접 써 보기
          </button>
        </div>
      ) : null}
    </section>
  );
}
