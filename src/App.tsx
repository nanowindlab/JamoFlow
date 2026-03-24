import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { JamoSelector } from './components/JamoSelector';
import { JamoStage } from './components/JamoStage';
import { StrokeWorkbook } from './components/StrokeWorkbook';
import { jamoItems } from './data/jamoData';
import type { JamoGroup } from './types';

const initialGroup: JamoGroup = 'vowel';

function App() {
  const [activeGroup, setActiveGroup] = useState<JamoGroup>(initialGroup);
  const [activeItemId, setActiveItemId] = useState('ㅏ');
  const [replayKey, setReplayKey] = useState(0);

  const activeItem = useMemo(
    () => jamoItems.find((item) => item.id === activeItemId) ?? jamoItems[0],
    [activeItemId],
  );

  useEffect(() => {
    if (activeItem.group !== activeGroup) {
      const nextItem = jamoItems.find((item) => item.group === activeGroup);
      if (nextItem) {
        setActiveItemId(nextItem.id);
      }
    }
  }, [activeGroup, activeItem.group]);

  useEffect(() => {
    setReplayKey((current) => current + 1);
  }, [activeItemId]);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">GitHub → Vercel 배포용 시작점</p>
          <h1>JamoFlow</h1>
          <p className="hero-description">
            한글 자음과 모음의 글자 쓰는 순서를 보고, 따라 쓰고, 다음 단계로
            확장할 수 있는 학습 앱 프로토타입입니다.
          </p>

          <div className="hero-metrics">
            <div>
              <strong>24개</strong>
              <span>기본 자모</span>
            </div>
            <div>
              <strong>2가지</strong>
              <span>학습 모드</span>
            </div>
            <div>
              <strong>Vercel</strong>
              <span>정적 배포 준비</span>
            </div>
          </div>
        </div>

        <div className="hero-focus">
          <div className="focus-label">{activeItem.categoryLabel}</div>
          <div className="focus-card">
            <div className="focus-char">{activeItem.char}</div>
            <div>
              <p className="focus-title">{activeItem.title}</p>
              <p className="focus-note">{activeItem.learningNote}</p>
            </div>
          </div>
          <button
            type="button"
            className="replay-button"
            onClick={() => setReplayKey((current) => current + 1)}
          >
            애니메이션 다시 보기
          </button>
        </div>
      </section>

      <section className="content-grid">
        <JamoSelector
          activeGroup={activeGroup}
          activeItemId={activeItem.id}
          onGroupChange={setActiveGroup}
          onItemSelect={setActiveItemId}
          items={jamoItems}
        />

        <div className="study-column">
          <JamoStage item={activeItem} replayKey={replayKey} />

          <section className="steps-card">
            <div className="section-title">
              <div>
                <p className="eyebrow">쓰는 순서</p>
                <h3>{activeItem.char} 따라 쓰기 설명</h3>
              </div>
              <span>예시 음절 {activeItem.example}</span>
            </div>

            <div className="step-list">
              {activeItem.strokes.map((stroke) => (
                <article key={stroke.id} className="step-item">
                  <div className="step-number">{stroke.order}</div>
                  <div>
                    <p className="step-label">{stroke.label}</p>
                    <p className="step-copy">{stroke.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <StrokeWorkbook item={activeItem} />
        </div>
      </section>
    </main>
  );
}

export default App;
