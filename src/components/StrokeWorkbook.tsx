import type { JamoItem } from '../types';

type StrokeWorkbookProps = {
  item: JamoItem;
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

export function StrokeWorkbook({ item }: StrokeWorkbookProps) {
  const cells = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <section className="workbook-card">
      <div className="section-title">
        <div>
          <p className="eyebrow">워크북 스타일</p>
          <h3>단계별 따라 쓰기</h3>
        </div>
        <span>{item.strokeCount}칸 활용</span>
      </div>

      <div className="workbook-grid">
        {cells.map((cell) => (
          <div key={`preview-${cell}`} className="workbook-cell">
            {cell <= item.strokeCount ? (
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
            <span className="practice-label">{cell === 1 ? '직접 써 보기' : ''}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
