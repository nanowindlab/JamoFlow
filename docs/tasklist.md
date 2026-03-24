# JamoFlow Tasklist

이 문서는 현재 실행 기준의 작업 목록이다.

## 현재 우선순위

### P0

- [x] Pipeline A: 자음 14개, 모음 10개의 획순을 전수 검증한다.
- [x] Pipeline A: 자료 간 불일치가 있는 자모를 목록화하고 확정 기준을 문서화한다.
- [x] Pipeline A: 현재 UI에 반영된 획순 데이터와 검증 결과가 일치하는지 다시 확인한다.

### P1

- [x] Pipeline B: 자모별 예시 단어 데이터 구조를 설계한다.
- [x] Pipeline B: 핵심 사용자 시나리오를 개발한다.
- [x] Pipeline C: 자모 상세 화면에 예시 단어 1~3개를 노출한다.
- [x] Pipeline B: 예시 단어 선정 기준을 정리한다.
- [x] Pipeline C: UI를 학습 흐름 중심으로 재구성한다.
- [x] Pipeline C: UI 개선안을 단계별로 정리한다.
- [x] Pipeline C: 모바일 레이아웃 기준을 정리한다.

### P2

- [x] Pipeline D: 직접 쓰기 캔버스의 모바일 입력 방식을 설계한다.
- [x] Pipeline D: `pointer events` 기반 드로잉 프로토타입을 만든다.
- [x] Pipeline D: 획순 힌트 표시/숨김, 지우기, 다시 쓰기 기능을 설계한다.

## 화면 기준 작업

### 홈

- [x] 홈 진입 메시지와 학습 시작 버튼 구조 설계
- [x] 홈 사용자 시나리오별 진입 흐름 설계
- [x] 자음/모음 빠른 진입 UX 설계

### 자모 목록

- [x] 자모 목록 카드 정보 밀도 조정
- [x] 진행 상태 표시 방식 결정

### 자모 상세

- [x] 큰 글자, 획순, 단계 설명, 예시 단어 배치 재설계
- [x] 자모 상세 사용자 시나리오 흐름 정리
- [x] 모바일에서 상세 화면 우선순위 재조정

### 따라 쓰기

- [x] 워크북형 그리드 UX 개선
- [x] 따라 쓰기 사용자 시나리오 정리
- [x] 단계별 힌트와 직접 쓰기 연결 흐름 설계

### 직접 쓰기

- [x] 빈 칸 캔버스 구조 설계
- [x] 모바일 손가락 입력 기준 정의
- [x] 직접 쓰기 사용자 시나리오 정리

## 첫 스프린트

### Sprint 1 목표

- 획순 데이터 신뢰도를 올리고
- 예시 단어를 붙일 수 있는 데이터 구조를 만들고
- UI 개편의 기준 화면을 확정한다.

### Sprint 1 작업

- [x] 획순 검증용 체크리스트 작성
- [x] 자모 24개의 검증 상태 표 작성
- [x] 검증 완료/검증 필요 상태를 데이터에 반영할 전략 수립
- [x] 예시 단어 필드 추가 설계
- [x] 자모 상세 화면 와이어프레임 작성
- [x] 모바일 기준 쓰기 캔버스 요구사항 정리
- [x] UI 개편 범위를 화면별로 분리

## 이번 턴 산출물

- [x] [획순 검증 체크리스트](./stroke-order-validation-checklist.md)
- [x] [자모 24개 검증 상태표](./stroke-order-validation-matrix.md)
- [x] [예시 단어 데이터 모델](./example-word-data-model.md)
- [x] [모바일 쓰기 요구사항](./mobile-writing-requirements.md)
- [x] [검증 상태 반영 전략](./validation-state-strategy.md)
- [x] [화면 와이어프레임 및 UI 범위](./screen-wireframes-and-ui-scope.md)
- [x] [파이프라인 워크플로우 설계](./pipeline-workflows.md)
- [x] [예시 단어 선정 기준](./example-word-selection-criteria.md)
- [x] [공통 리뷰 체크리스트](./review-checklist.md)
- [x] [예시 단어 감사 시작 문서](./example-word-audit.md)
- [x] [사용자 시나리오 및 UI 개선안](./user-scenarios-and-ui-improvements.md)
- [x] [모바일 레이아웃 정리안](./mobile-layout-plan.md)
- [x] [직접 쓰기 확장 계획](./writing-expansion-plan.md)

## 다음 실행 후보

- [x] `jamoData.ts`에 자모 24개의 `validation` 필드를 1차 반영한다.
- [x] 자모 상세 화면에 상태 배지와 예시 단어 영역을 설계한다.
- [x] 현재 `App.tsx`를 홈/자모 상세 흐름 기준으로 재구성한다.
- [x] Pipeline B: 예시 단어 선정 기준 문서를 확정하고 실제 단어를 검수한다.
- [x] Pipeline C: 검증 상태 배지를 자모 목록과 상세 화면에서 더 일관되게 다듬는다.
- [x] Pipeline D: 직접 쓰기 캔버스 화면의 실제 컴포넌트 구현을 시작한다.
- [x] Pipeline C: 모바일 레이아웃 정리안을 실제 UI에 반영한다.
- [x] Pipeline D: 직접 쓰기 CTA와 완료 후 흐름을 연결한다.

## 현재 활성 파이프라인

- 활성: Pipeline C 후속 UI 정리 후보 선택
- 전환 조건:
  - 다음 UI 패키지 범위 확정

## 오픈 백로그 파이프라인

- 현재 없음

## 결정 필요 사항

- [ ] 획순 기준 소스를 무엇으로 최종 고정할지
- [ ] 예시 단어를 텍스트만 둘지, 음성/이미지까지 확장할지
- [x] 직접 쓰기 결과를 MVP에서 어디까지 판정할지
- [ ] 모바일 우선으로 갈지, 데스크톱 병행으로 갈지
