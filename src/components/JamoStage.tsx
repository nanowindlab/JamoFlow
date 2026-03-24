import type { CSSProperties } from 'react';
import type { JamoItem } from '../types';

type JamoStageProps = {
  item: JamoItem;
  replayKey: number;
};

export function JamoStage({ item, replayKey }: JamoStageProps) {
  return (
    <div className="stage-card">
      <div className="stage-header">
        <div>
          <p className="eyebrow">획순 미리보기</p>
          <h2>
            {item.char} <span>{item.title}</span>
          </h2>
        </div>
        <div className="stage-badge">{item.strokeCount}획</div>
      </div>

      <svg
        className="stage-canvas"
        viewBox="0 0 120 120"
        aria-label={`${item.char} 획순`}
        key={replayKey}
      >
        <defs>
          <marker
            id="stroke-arrow"
            markerUnits="userSpaceOnUse"
            markerWidth="4"
            markerHeight="4"
            refX="3.4"
            refY="2"
            orient="auto"
          >
            <path d="M 0 0 L 4 2 L 0 4 z" fill="currentColor" />
          </marker>
        </defs>

        <rect x="8" y="8" width="104" height="104" rx="18" className="guide-outline" />
        <line x1="60" y1="8" x2="60" y2="112" className="guide-line" />
        <line x1="8" y1="60" x2="112" y2="60" className="guide-line" />

        <text x="60" y="78" className="stage-watermark">
          {item.char}
        </text>

        {item.strokes.map((stroke) => (
          <g key={stroke.id} className="stroke-layer">
            <path
              d={stroke.svgPath}
              className="stroke-guide"
              pathLength={100}
            />
            <path
              d={stroke.svgPath}
              className="stroke-main"
              markerEnd="url(#stroke-arrow)"
              pathLength={100}
              style={
                {
                  '--stroke-delay': `${(stroke.order - 1) * 0.55}s`,
                } as CSSProperties
              }
            />
            <circle
              cx={stroke.start[0]}
              cy={stroke.start[1]}
              r="4.2"
              className="stroke-start"
              style={
                {
                  '--stroke-delay': `${(stroke.order - 1) * 0.55}s`,
                } as CSSProperties
              }
            />
            <g
              className="stroke-order"
              style={
                {
                  '--stroke-delay': `${(stroke.order - 1) * 0.55}s`,
                } as CSSProperties
              }
            >
              <circle cx={stroke.start[0] - 7} cy={stroke.start[1] - 7} r="6.5" />
              <text x={stroke.start[0] - 7} y={stroke.start[1] - 4.8}>
                {stroke.order}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
