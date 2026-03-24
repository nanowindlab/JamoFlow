# JamoFlow Validation State Strategy

## 목적

획순 검증 상태를 문서에만 남기지 않고, 실제 데이터 구조와 UI 노출 정책에 연결하기 위한 전략 문서다.

## 문제

- 현재 획순 검증 상태는 문서에만 있고 런타임 데이터와 연결되어 있지 않다.
- 검증되지 않은 자모도 UI에서는 확정된 학습 콘텐츠처럼 보일 수 있다.
- 향후 예시 단어, 퀴즈, 직접 쓰기 기능이 붙으면 검증 상태를 기준으로 노출 수준을 나눌 필요가 있다.

## 목표

- `src/data/jamoData.ts`의 각 자모에 검증 상태를 직접 붙인다.
- UI가 검증 상태에 따라 다른 문구와 배지를 표시할 수 있게 한다.
- 검증 상태가 바뀌면 문서와 앱이 함께 갱신되는 흐름을 만든다.

## 데이터 반영 전략

이미 [types.ts](/Users/nanowind/Library/CloudStorage/SynologyDrive-Work/Project/AI/codex/JamoFlow/src/types.ts)에 아래 타입이 추가되어 있다.

- `ValidationStatus`
- `ValidationSource`
- `JamoValidation`

각 자모는 아래 구조를 갖는다.

```ts
validation?: {
  status: 'unverified' | 'first_pass_checked' | 'conflict_found' | 'confirmed';
  sources: ValidationSource[];
  notes?: string;
  reviewedAt?: string;
}
```

## 상태별 운영 규칙

### unverified

- 기본 상태
- UI에서 `검증 전` 배지 표시
- 학습은 가능하지만 `확인 중인 획순` 안내 문구 노출
- 퀴즈/정답형 기능에서는 제외 가능

### first_pass_checked

- 교재 또는 단일 기준 1차 확인 완료
- UI에서 `1차 확인` 배지 표시
- 메인 학습 화면에는 노출 가능
- 정답 확정형 표현은 피하고, 내부 검토가 더 필요함을 명시

### conflict_found

- 자료 간 차이 또는 앱 반영값 차이 발견
- UI에서 `재검토 필요` 배지 표시
- 정답형 퀴즈에서 제외
- 관리 화면 또는 개발 모드에서 메모를 우선 노출

### confirmed

- 최소 2개 이상의 일치 자료 + 앱 반영 확인 완료
- UI에서 `검증 완료` 배지 표시
- 퀴즈/직접 쓰기/예시 단어까지 포함한 정식 학습 흐름에 사용

## UI 반영 정책

### 자모 목록

- 각 자모 카드에 작은 상태 점 또는 배지 표시
- `conflict_found` 자모는 경고색 사용
- `confirmed`만 기본 추천 순서에 포함 가능

### 자모 상세

- 제목 아래 상태 배지 표시
- `notes`가 있으면 개발/관리 모드에서 노출
- `sources`는 일반 사용자용이 아니라 내부 검증용 패널에 표시

### 퀴즈/확인 화면

- 기본값은 `confirmed`만 출제
- `first_pass_checked`는 실험 모드에서만 허용
- `conflict_found`, `unverified`는 제외

## 문서 동기화 규칙

검증 상태가 변경될 때는 아래 순서를 따른다.

1. [stroke-order-validation-matrix.md](./stroke-order-validation-matrix.md) 갱신
2. [jamoData.ts](/Users/nanowind/Library/CloudStorage/SynologyDrive-Work/Project/AI/codex/JamoFlow/src/data/jamoData.ts) 반영
3. 필요하면 [tasklist.md](./tasklist.md)와 관련 UI 문구 갱신

## 구현 단계

### 단계 1

- `jamoData.ts`에 모든 자모의 `validation` 필드 추가
- 상태는 우선 `unverified` 또는 `first_pass_checked`로 입력

### 단계 2

- 자모 목록/상세 화면에 상태 배지 노출

### 단계 3

- 퀴즈와 직접 쓰기 기능에서 `confirmed` 필터 적용

## 지금 바로 필요한 후속 작업

- 24자모에 임시 `validation` 필드를 일괄 삽입
- `stroke-order-validation-matrix.md` 기준 상태를 데이터와 맞춤
- 자모 상세 화면에 상태 배지 영역 설계
