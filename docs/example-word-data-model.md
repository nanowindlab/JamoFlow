# JamoFlow Example Word Data Model

## 목표

자모 학습 화면에 예시 단어를 1~3개씩 붙일 수 있도록, 최소한의 데이터 구조를 정의한다.

## 설계 원칙

- 단어는 학습자 난도가 낮아야 한다.
- 자모와 단어의 연결이 분명해야 한다.
- MVP에서는 텍스트 중심으로 시작하고, 이미지/오디오는 선택 확장으로 둔다.
- 자모 데이터와 예시 단어 데이터는 함께 렌더링할 수 있어야 한다.

## 권장 타입

`src/types.ts`에 반영된 구조 기준:

```ts
type ExampleWord = {
  id: string;
  word: string;
  gloss: string;
  difficulty: 'starter' | 'basic';
  highlightJamo: string;
  note?: string;
  imageKey?: string;
  audioKey?: string;
};
```

## JamoItem 확장

```ts
type JamoItem = {
  ...
  example: string;
  examples?: ExampleWord[];
  validation?: JamoValidation;
  strokes: Stroke[];
};
```

## 필드 설명

- `id`: 예시 단어 식별자
- `word`: 실제 단어
- `gloss`: 학습자용 뜻
- `difficulty`: 입문 난도
- `highlightJamo`: 이 단어에서 중심으로 보여 줄 자모
- `note`: 교사용 또는 보조 설명
- `imageKey`: 나중에 이미지 카드 연결용
- `audioKey`: 나중에 발음 음원 연결용

## MVP 예시

### ㅏ

- 아기 / baby
- 가방 / bag

### ㅁ

- 머리 / head
- 나무 / tree

### ㅂ

- 바다 / sea
- 비 / rain

## UI 사용 방식

- 자모 상세 화면: 대표 단어 1개 + 보조 단어 1~2개
- 퀴즈 화면: 자모-단어 연결 문제
- 추후 확장: 이미지 매칭, 음성 듣기

## 후속 작업

- 실제 단어 리스트 큐레이션
- 학습 난도 기준 정의
- 문화/연령 적합성 점검
