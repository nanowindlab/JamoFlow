# JamoFlow

한국어 기본 자음 14개와 기본 모음 10개의 글자 쓰는 순서를 보여 주는 학습용 웹 앱 프로토타입입니다.

## 기획 문서

- [PRD](./docs/PRD.md)
- [Tasklist](./docs/tasklist.md)
- [Validation Strategy](./docs/validation-state-strategy.md)
- [Screen Wireframes](./docs/screen-wireframes-and-ui-scope.md)
- [User Scenarios](./docs/user-scenarios-and-ui-improvements.md)
- [Mobile Layout Plan](./docs/mobile-layout-plan.md)
- [Writing Expansion Plan](./docs/writing-expansion-plan.md)
- [Example Word Audit](./docs/example-word-audit.md)

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Vercel에서 해당 GitHub 저장소를 Import 합니다.
3. Framework Preset은 `Vite`를 사용합니다.
4. Build Command는 `npm run build`, Output Directory는 `dist`로 두면 됩니다.

## 현재 범위

- 기본 자음 14개
- 기본 모음 10개
- SVG 획순 애니메이션
- 자모별 검증 상태 표시
- 자모별 예시 단어 카드
- 워크북 스타일 단계별 따라 쓰기 그리드
- 모바일 직접 쓰기 프로토타입
- `assist` 기반 완료 보조 판정

## 현재 핵심 이슈

- 후속 `UI` 패키지 범위 확정 필요
- `guide mode / free mode` 분리 여부 결정 필요
- `assist rule` 이후 추가 `feedback` 범위 결정 필요

획순 데이터는 `src/data/jamoData.ts`에서 바로 확장하거나 수정할 수 있습니다.
