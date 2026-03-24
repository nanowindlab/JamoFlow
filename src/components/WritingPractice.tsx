import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { JamoItem } from '../types';

type WritingPoint = {
  x: number;
  y: number;
};

type WritingPath = {
  id: string;
  points: WritingPoint[];
};

type WritingPracticeProps = {
  item: JamoItem;
  onNextItem?: () => void;
  onRestartFlow?: () => void;
};

const VIEWBOX_SIZE = 240;

function toSvgPoint(
  event: ReactPointerEvent<SVGSVGElement>,
  element: SVGSVGElement,
): WritingPoint {
  const rect = element.getBoundingClientRect();

  return {
    x: ((event.clientX - rect.left) / rect.width) * VIEWBOX_SIZE,
    y: ((event.clientY - rect.top) / rect.height) * VIEWBOX_SIZE,
  };
}

function pointsToPath(points: WritingPoint[]) {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    const point = points[0];
    return `M ${point.x} ${point.y} L ${point.x + 0.1} ${point.y + 0.1}`;
  }

  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
}

function getPathLength(points: WritingPoint[]) {
  if (points.length < 2) {
    return 0;
  }

  return points.slice(1).reduce((total, point, index) => {
    const previous = points[index];
    const dx = point.x - previous.x;
    const dy = point.y - previous.y;

    return total + Math.hypot(dx, dy);
  }, 0);
}

export function WritingPractice({ item, onNextItem, onRestartFlow }: WritingPracticeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [paths, setPaths] = useState<WritingPath[]>([]);
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setPaths([]);
    setActivePathId(null);
    setShowHint(true);
  }, [item.id]);

  const currentStrokeIndex = paths.length >= item.strokes.length ? null : paths.length;
  const currentStroke = currentStrokeIndex === null ? null : item.strokes[currentStrokeIndex] ?? null;
  const isComplete = currentStrokeIndex === null;
  const progressRatio = item.strokes.length === 0 ? 0 : Math.min(paths.length / item.strokes.length, 1);
  const totalDrawLength = paths.reduce((total, path) => total + getPathLength(path.points), 0);
  const meetsAssistRule =
    paths.length >= item.strokes.length &&
    paths.every((path) => path.points.length >= 3) &&
    totalDrawLength >= item.strokes.length * 24;

  const activeHintText = useMemo(() => {
    if (!currentStroke) {
      return '기준 획을 모두 따라 본 상태입니다. 다시 쓰거나 다음 자모로 넘어갈 수 있습니다.';
    }

    return `${currentStroke.label} · ${currentStroke.description}`;
  }, [currentStroke]);

  const startPath = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) {
      return;
    }

    const point = toSvgPoint(event, svgRef.current);
    const id = `path-${Date.now()}`;

    setActivePathId(id);
    setPaths((current) => [...current, { id, points: [point] }]);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const movePath = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!svgRef.current || !activePathId) {
      return;
    }

    const point = toSvgPoint(event, svgRef.current);

    setPaths((current) =>
      current.map((path) =>
        path.id === activePathId
          ? { ...path, points: [...path.points, point] }
          : path,
      ),
    );
  };

  const endPath = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (activePathId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setActivePathId(null);
  };

  return (
    <section className="writing-card">
      <div className="section-title">
        <div>
          <p className="eyebrow">직접 써 보기</p>
          <h3>{item.char} 모바일 쓰기 연습</h3>
        </div>
        <span>{paths.length}획 입력</span>
      </div>

      <div className="writing-status">
        <div className="writing-status__text">
          <strong>현재 힌트</strong>
          <p>{showHint ? activeHintText : '힌트 숨김 상태입니다.'}</p>
        </div>
        <div className="writing-status__meta">
          {showHint
            ? currentStrokeIndex === null
              ? '기준 획 힌트 완료'
              : `다음 기준 ${currentStrokeIndex + 1}획`
            : '힌트 꺼짐'}
        </div>
      </div>

      <div className="writing-progress">
        <div className="writing-progress__bar">
          <div
            className="writing-progress__fill"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
        <div className="writing-progress__label">
          {paths.length}/{item.strokes.length} 기준 획
        </div>
      </div>

      <div className="writing-canvas-shell">
        <svg
          ref={svgRef}
          className="writing-canvas"
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          role="img"
          aria-label={`${item.char} 직접 쓰기 연습`}
          onPointerDown={startPath}
          onPointerMove={movePath}
          onPointerUp={endPath}
          onPointerLeave={endPath}
          onPointerCancel={endPath}
        >
          <rect
            x="14"
            y="14"
            width="212"
            height="212"
            rx="28"
            className="writing-frame"
          />
          <line x1="120" y1="14" x2="120" y2="226" className="writing-guide-line" />
          <line x1="14" y1="120" x2="226" y2="120" className="writing-guide-line" />

          <text x="120" y="152" className="writing-watermark">
            {item.char}
          </text>

          {showHint && currentStroke ? (
            <path d={currentStroke.svgPath} className="writing-hint-stroke" />
          ) : null}

          {paths.map((path) => (
            <path
              key={path.id}
              d={pointsToPath(path.points)}
              className="writing-user-stroke"
            />
          ))}
        </svg>
      </div>

      {isComplete ? (
        meetsAssistRule ? (
          <div className="writing-feedback writing-feedback--complete">
            <strong>완료 보조 규칙을 통과했습니다.</strong>
            <p>기준 획 수, 최소 입력 길이, 최소 이동량을 충족했습니다.</p>
          </div>
        ) : (
          <div className="writing-feedback writing-feedback--warning">
            <strong>기준 획 수는 채웠지만 입력이 너무 짧습니다.</strong>
            <p>각 획을 조금 더 길게 쓰거나 다시 연습한 뒤 다음 자모로 넘어가세요.</p>
          </div>
        )
      ) : (
        <div className="writing-feedback">
          <strong>진행 중</strong>
          <p>현재 힌트를 보고 같은 순서로 써 보세요.</p>
        </div>
      )}

      <div className="writing-controls">
        <button type="button" className="writing-button" onClick={() => setShowHint((current) => !current)}>
          {showHint ? '힌트 숨기기' : '힌트 보기'}
        </button>
        <button
          type="button"
          className="writing-button"
          onClick={() => setPaths((current) => current.slice(0, -1))}
          disabled={paths.length === 0}
        >
          한 획 지우기
        </button>
        <button
          type="button"
          className="writing-button writing-button--strong"
          onClick={() => setPaths([])}
          disabled={paths.length === 0}
        >
          다시 쓰기
        </button>
      </div>

      <div className="flow-actions">
        <button
          type="button"
          className="flow-button"
          onClick={() => {
            setPaths([]);
            setShowHint(true);
            onRestartFlow?.();
          }}
        >
          처음부터 다시
        </button>
        <button
          type="button"
          className="flow-button flow-button--strong"
          onClick={onNextItem}
          disabled={!onNextItem || !isComplete}
        >
          다음 자모
        </button>
      </div>
    </section>
  );
}
