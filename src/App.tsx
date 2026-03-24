import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import { JamoSelector } from './components/JamoSelector';
import { JamoStage } from './components/JamoStage';
import { StrokeWorkbook } from './components/StrokeWorkbook';
import { WritingPractice } from './components/WritingPractice';
import { jamoItems } from './data/jamoData';
import type { JamoGroup } from './types';
import { validationMeta } from './validationMeta';

const initialGroup: JamoGroup = 'vowel';

function getDailyStarter(group: JamoGroup) {
  const groupItems = jamoItems.filter((item) => item.group === group);
  const today = new Date();
  const daySeed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();

  return groupItems[daySeed % groupItems.length] ?? groupItems[0];
}

function App() {
  const initialVowelItem = getDailyStarter('vowel');
  const [activeGroup, setActiveGroup] = useState<JamoGroup>(initialGroup);
  const [activeItemId, setActiveItemId] = useState(initialVowelItem.id);
  const [replayKey, setReplayKey] = useState(0);
  const detailRef = useRef<HTMLElement | null>(null);
  const workbookRef = useRef<HTMLElement | null>(null);
  const writingRef = useRef<HTMLElement | null>(null);

  const activeItem = useMemo(
    () => jamoItems.find((item) => item.id === activeItemId) ?? jamoItems[0],
    [activeItemId],
  );
  const currentGroupItems = useMemo(
    () => jamoItems.filter((item) => item.group === activeGroup),
    [activeGroup],
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

  const currentValidation = activeItem.validation
    ? validationMeta[activeItem.validation.status]
    : validationMeta.unverified;
  const compactSteps = activeItem.strokes.length > 3;
  const dailyVowelStarter = getDailyStarter('vowel');
  const dailyConsonantStarter = getDailyStarter('consonant');

  const startGroupFlow = (group: JamoGroup) => {
    setActiveGroup(group);
    const starter = group === 'vowel' ? dailyVowelStarter : dailyConsonantStarter;
    if (starter) {
      setActiveItemId(starter.id);
    }
    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const scrollToSection = (section: 'detail' | 'workbook' | 'writing') => {
    const target =
      section === 'detail'
        ? detailRef.current
        : section === 'workbook'
          ? workbookRef.current
          : writingRef.current;

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const moveToNextItem = () => {
    const currentIndex = currentGroupItems.findIndex((item) => item.id === activeItem.id);
    const nextItem = currentGroupItems[(currentIndex + 1) % currentGroupItems.length];

    if (!nextItem) {
      return;
    }

    setActiveItemId(nextItem.id);
    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <main className="app-shell">
      <section className="hero-panel hero-panel--compact">
        <div className="hero-copy">
          <p className="eyebrow">한글 자모 쓰기 학습</p>
          <h1>JamoFlow</h1>
          <p className="hero-description">
            자모 하나를 보고, 획순을 익히고, 예시 단어와 함께 기억하는 학습 흐름에
            맞춘 프로토타입입니다.
          </p>

          <div className="hero-actions">
            <button type="button" className="flow-button flow-button--strong" onClick={() => startGroupFlow('vowel')}>
              모음부터 시작
            </button>
            <button type="button" className="flow-button" onClick={() => startGroupFlow('consonant')}>
              자음부터 시작
            </button>
          </div>

          <div className="hero-starters">
            <div className="hero-starter-card">
              <span>오늘의 시작 모음</span>
              <strong>{dailyVowelStarter.char}</strong>
              <small>{dailyVowelStarter.title}</small>
            </div>
            <div className="hero-starter-card">
              <span>오늘의 시작 자음</span>
              <strong>{dailyConsonantStarter.char}</strong>
              <small>{dailyConsonantStarter.title}</small>
            </div>
          </div>

          <div className="hero-metrics hero-metrics--compact">
            <div>
              <strong>24개</strong>
              <span>기본 자모</span>
            </div>
            <div>
              <strong>예시 단어</strong>
              <span>자모별 2개씩</span>
            </div>
            <div>
              <strong>모바일 고려</strong>
              <span>쓰기 흐름 설계 중</span>
            </div>
          </div>
        </div>

        <div className="hero-focus">
          <div className="focus-topline">
            <div className="focus-label">{activeItem.categoryLabel}</div>
            <div className={`validation-pill validation-pill--${currentValidation.tone}`}>
              {currentValidation.label}
            </div>
          </div>
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
          <section ref={detailRef} className="detail-card">
            <div className="detail-card__header">
              <div>
                <p className="eyebrow">자모 상세</p>
                <h2 className="detail-card__title">
                  {activeItem.char} <span>{activeItem.title}</span>
                </h2>
              </div>
              <div className={`validation-pill validation-pill--${currentValidation.tone}`}>
                {currentValidation.label}
              </div>
            </div>

            <div className="detail-summary">
              <div className="detail-summary__main">
                <strong>핵심 포인트</strong>
                <p>{activeItem.learningNote}</p>
              </div>
              <div className="detail-summary__examples">
                <span>대표 단어</span>
                <div className="detail-summary__chips">
                  {(activeItem.examples ?? []).slice(0, 2).map((exampleWord) => (
                    <span key={exampleWord.id} className="detail-summary__chip">
                      {exampleWord.word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flow-actions">
              <button type="button" className="flow-button" onClick={() => scrollToSection('workbook')}>
                따라 쓰기 시작
              </button>
              <button type="button" className="flow-button flow-button--strong" onClick={() => scrollToSection('writing')}>
                직접 써 보기
              </button>
            </div>

            <div className="detail-meta">
              <div className="detail-meta__item">
                <strong>{activeItem.strokeCount}획</strong>
                <span>현재 자모</span>
              </div>
              <div className="detail-meta__item">
                <strong>{activeItem.example}</strong>
                <span>대표 음절</span>
              </div>
              <div className="detail-meta__item">
                <strong>{activeItem.examples?.length ?? 0}개</strong>
                <span>예시 단어</span>
              </div>
            </div>

            {(activeItem.validation?.notes || (activeItem.validation?.sources ?? []).length > 0) ? (
              <details className="detail-proof">
                <summary>검증 정보 보기</summary>
                {activeItem.validation?.notes ? (
                  <p className="validation-note">{activeItem.validation.notes}</p>
                ) : null}

                <div className="validation-source-list">
                  {(activeItem.validation?.sources ?? []).map((validationSource) => (
                    <span key={`${activeItem.id}-${validationSource.label}`} className="validation-source-chip">
                      {validationSource.kind === 'workbook' ? '교재' : '웹'} {validationSource.label}
                    </span>
                  ))}
                </div>
              </details>
            ) : null}
          </section>

          <JamoStage item={activeItem} replayKey={replayKey} />

          <section className="steps-card">
            <div className="section-title">
              <div>
                <p className="eyebrow">쓰는 순서</p>
                <h3>{activeItem.char} 따라 쓰기 설명</h3>
              </div>
              <span>예시 음절 {activeItem.example}</span>
            </div>

            <div className={compactSteps ? 'step-list step-list--compact' : 'step-list'}>
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

          <section className="examples-card">
            <div className="section-title">
              <div>
                <p className="eyebrow">예시 단어</p>
                <h3>{activeItem.char}가 들어간 단어</h3>
              </div>
              <span>{activeItem.examples?.length ?? 0}개</span>
            </div>

            <div className="example-grid">
              {(activeItem.examples ?? []).map((exampleWord) => (
                <article key={exampleWord.id} className="example-card">
                  <div className="example-card__word">{exampleWord.word}</div>
                  <div className="example-card__meta">
                    <strong>{exampleWord.gloss}</strong>
                    <span>{exampleWord.difficulty === 'starter' ? '입문' : '기초'}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section ref={workbookRef}>
            <StrokeWorkbook item={activeItem} onContinueToWriting={() => scrollToSection('writing')} />
          </section>

          <section ref={writingRef}>
            <WritingPractice
              item={activeItem}
              onNextItem={moveToNextItem}
              onRestartFlow={() => scrollToSection('detail')}
            />
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
