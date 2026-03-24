# JamoFlow Stroke Order Validation Checklist

## 목적

자음 14개와 모음 10개의 획순을 앱에 확정 반영하기 전에, 각 자모를 같은 기준으로 검증하기 위한 체크리스트다.

## 상태 정의

- `unverified`: 아직 검증 전
- `first_pass_checked`: 교재 또는 단일 자료 기준 1차 확인 완료
- `conflict_found`: 자료 간 불일치 또는 앱 반영값과의 차이 발견
- `confirmed`: 최소 2개 이상의 일치 자료와 앱 반영 확인 완료

## 검증 기준

### 필수 확인 항목

1. 획 수가 맞는가
2. 1획의 시작 위치가 맞는가
3. 획 진행 방향이 맞는가
4. 각 획의 연결 순서가 맞는가
5. 앱에 반영된 좌표와 설명 문구가 같은 순서를 가리키는가
6. 모바일/데스크톱 렌더링에서 번호와 화살표가 글자 판독을 방해하지 않는가

### 자료 우선순위

1. 프로젝트 내 교재 원본 PDF
2. 이미지형 획순 자료
3. 설명형 웹 자료
4. 내부 검증 메모

### 충돌 처리 규칙

- 교재와 외부 이미지 자료가 일치하면 `confirmed` 후보로 올린다.
- 교재와 웹 설명이 다르면 설명형 자료는 보조 참고로만 둔다.
- 앱 좌표가 기준 자료와 다르면 `conflict_found`로 표시한다.
- `confirmed` 전에는 획순을 확정본으로 소개하지 않는다.

## 자모별 검증 절차

1. 교재 PDF에서 해당 자모의 순서도 페이지를 연다.
2. 1획 번호, 마지막 획 번호, 획 방향을 기록한다.
3. 이미지형 외부 자료 1개 이상과 대조한다.
4. 현재 앱 데이터 `src/data/jamoData.ts`의 `strokes` 배열과 비교한다.
5. 불일치가 있으면 차이를 문장으로 남긴다.
6. 수정 후 앱에서 다시 확인한다.
7. 상태표를 갱신한다.

## 확인 산출물

- 검증 상태표: [stroke-order-validation-matrix.md](./stroke-order-validation-matrix.md)
- 데이터 구현 파일: [jamoData.ts](/Users/nanowind/Library/CloudStorage/SynologyDrive-Work/Project/AI/codex/JamoFlow/src/data/jamoData.ts)
- 모바일 요구사항: [mobile-writing-requirements.md](./mobile-writing-requirements.md)
- 예시 단어 데이터 모델: [example-word-data-model.md](./example-word-data-model.md)

## 현재 기준 소스

- 교재 원본: [한글 자모음 PDF](/Users/nanowind/Library/CloudStorage/SynologyDrive-Work/Project/AI/codex/JamoFlow/sources/%E1%84%89%E1%85%A1%E1%84%92%E1%85%AC%E1%84%90%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A1%E1%86%B8%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%86%B7%200%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A8%20%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%B3%E1%86%AF%E1%84%8C%E1%85%A1%E1%84%86%E1%85%A9%E1%84%8B%E1%85%B3%E1%86%B7%281~15%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5%29_%E1%84%82%E1%85%A2%E1%84%8C%E1%85%B5.pdf)
- 외부 이미지 자료 묶음: [Wikimedia Commons Hangeul stroke order](https://commons.wikimedia.org/wiki/Category:Hangeul_stroke_order)
- 모음 참고:
  - [ㅓ](https://commons.wikimedia.org/wiki/File:%E3%85%93_(eo)_stroke_order.png)
  - [ㅗ](https://commons.wikimedia.org/wiki/File:%E3%85%97_(o)_stroke_order.png)
  - [ㅜ](https://commons.wikimedia.org/wiki/File:%E3%85%9C_(u)_stroke_order.png)
  - [ㅛ](https://commons.wikimedia.org/wiki/File:%E3%85%9B_(yo)_stroke_order.png)
- 자음 참고:
  - [ㄹ](https://commons.wikimedia.org/wiki/File:%E3%84%B9_(rieul)_stroke_order.png)
  - [ㅂ](https://commons.wikimedia.org/wiki/File:%E3%85%82_(bieup)_stroke_order.png)
  - [ㅋ](https://commons.wikimedia.org/wiki/File:%E3%85%8B_(kieuk)_stroke_order.png)
  - [ㅍ](https://commons.wikimedia.org/wiki/File:%E3%85%8D_(pieup)_stroke_order.png)
  - [ㅎ](https://commons.wikimedia.org/wiki/File:%E3%85%8E_(hieut)_stroke_order.png)
