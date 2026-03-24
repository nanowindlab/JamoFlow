# JamoFlow Stroke Order Validation Matrix

기준일: 2026-03-24

## 상태 요약

- `unverified`: 아직 검증 미실시
- `first_pass_checked`: 교재 또는 단일 기준 1차 확인
- `conflict_found`: 자료 간 또는 앱 반영값 간 충돌 발견
- `confirmed`: 교차 검증과 앱 반영까지 확인

## 자모 24개 상태표

| 자모 | 그룹 | 현재 상태 | 우선순위 | 메모 |
| --- | --- | --- | --- | --- |
| ㄱ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 2획 확인 |
| ㄴ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 2획 확인 |
| ㄷ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 3획 확인 |
| ㄹ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 자료 모두 3획, 마지막 획은 세로+아랫가로 연결획 |
| ㅁ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 4획 확인 |
| ㅂ | 자음 | confirmed | 낮음 | 교재 확대본 기준으로 4획 구조 확인 |
| ㅅ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 2획 확인 |
| ㅇ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 단획 확인 |
| ㅈ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 3획 확인 |
| ㅊ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 4획 확인 |
| ㅋ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 이미지 기준으로 현재 순서 유지 가능 |
| ㅌ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 4획 확인 |
| ㅍ | 자음 | confirmed | 낮음 | 교재와 Wikimedia 이미지 모두 현재 구조와 일치 |
| ㅎ | 자음 | confirmed | 낮음 | 윗가로, 가운데 가로, 원 순서 확인 |
| ㅏ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 2획 확인 |
| ㅑ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 3획 확인 |
| ㅓ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 이미지 모두 세로 후 왼쪽 가로 |
| ㅕ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 모두 세로 후 왼쪽 가로 2개 |
| ㅗ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 이미지 모두 세로 후 가로 |
| ㅛ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 3획 확인 |
| ㅜ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 2획 확인 |
| ㅠ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 모두 세로 2개 후 아래 가로 |
| ㅡ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 단일 가로획 확인 |
| ㅣ | 모음 | confirmed | 낮음 | 교재와 Wikimedia 파일 페이지 기준으로 단일 세로획 확인 |

## 현재 작업 순서

1. 현재 MVP 범위 기준 24자모 baseline confirmed 유지
2. 이후 신규 자료가 생기면 검증 상태를 다시 재평가
3. 현재는 UI와 콘텐츠 안정화 작업을 우선

## 비고

- 현재 상태표는 확정표가 아니라 작업 관리용 현황표다.
- 사용자가 지적한 `ㅕ`는 교재와 Wikimedia 기준 모두 현재 구현과 일치한다.
