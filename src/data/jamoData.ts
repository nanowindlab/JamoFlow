import type { ExampleWord, JamoItem, JamoValidation, Stroke } from '../types';

const line = (
  id: string,
  order: number,
  start: [number, number],
  end: [number, number],
  description: string,
): Stroke => ({
  id,
  order,
  label: `${order}획`,
  description,
  svgPath: `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`,
  start,
  end,
});

const pathStroke = (
  id: string,
  order: number,
  svgPath: string,
  start: [number, number],
  end: [number, number],
  description: string,
): Stroke => ({
  id,
  order,
  label: `${order}획`,
  description,
  svgPath,
  start,
  end,
});

const circle = (
  id: string,
  order: number,
  center: [number, number],
  radius: number,
  description: string,
): Stroke => ({
  id,
  order,
  label: `${order}획`,
  description,
  svgPath: [
    `M ${center[0]} ${center[1] - radius}`,
    `A ${radius} ${radius} 0 1 1 ${center[0]} ${center[1] + radius}`,
    `A ${radius} ${radius} 0 1 1 ${center[0]} ${center[1] - radius}`,
  ].join(' '),
  start: [center[0], center[1] - radius],
  end: [center[0], center[1] - radius],
});

const makeItem = (
  char: string,
  title: string,
  group: 'consonant' | 'vowel',
  learningNote: string,
  example: string,
  strokes: Stroke[],
): JamoItem => ({
  id: char,
  char,
  title,
  group,
  categoryLabel: group === 'consonant' ? '자음' : '모음',
  strokeCount: strokes.length,
  learningNote,
  example,
  strokes,
});

const source = (
  label: string,
  kind: 'workbook' | 'web' | 'internal_note',
  url?: string,
) => ({
  label,
  kind,
  url,
  checkedAt: '2026-03-24',
});

const review = (
  status: JamoValidation['status'],
  notes: string,
  sources: JamoValidation['sources'],
): JamoValidation => ({
  status,
  notes,
  sources,
  reviewedAt: '2026-03-24',
});

const words = (...items: ExampleWord[]) => items;

const baseJamoItems: JamoItem[] = [
  makeItem(
    'ㄱ',
    '기역',
    'consonant',
    '위 가로선을 먼저 쓰고 오른쪽 세로선을 내려갑니다.',
    '가',
    [
      line('g-1', 1, [24, 24], [92, 24], '위에서 왼쪽에서 오른쪽으로 긋기'),
      line('g-2', 2, [92, 24], [92, 98], '오른쪽 끝에서 아래로 내리기'),
    ],
  ),
  makeItem(
    'ㄴ',
    '니은',
    'consonant',
    '왼쪽 세로선을 먼저 쓰고 아래 가로선을 이어 줍니다.',
    '나',
    [
      line('n-1', 1, [30, 18], [30, 98], '왼쪽에서 위에서 아래로 내리기'),
      line('n-2', 2, [30, 98], [96, 98], '아래에서 왼쪽에서 오른쪽으로 긋기'),
    ],
  ),
  makeItem(
    'ㄷ',
    '디귿',
    'consonant',
    '윗줄, 왼쪽 세로줄, 아랫줄 순서로 틀을 만듭니다.',
    '다',
    [
      line('d-1', 1, [24, 24], [96, 24], '윗가로선을 왼쪽에서 오른쪽으로 긋기'),
      line('d-2', 2, [24, 24], [24, 98], '왼쪽에서 위에서 아래로 내리기'),
      line('d-3', 3, [24, 98], [96, 98], '아랫가로선을 왼쪽에서 오른쪽으로 긋기'),
    ],
  ),
  makeItem(
    'ㄹ',
    '리을',
    'consonant',
    '첫 획에서 윗가로선을 긋고 오른쪽 아래로 꺾은 뒤, 가운데 가로선과 마지막 연결획을 차례로 씁니다.',
    '라',
    [
      pathStroke(
        'r-1',
        1,
        'M 24 24 L 96 24 L 96 54',
        [24, 24],
        [96, 54],
        '윗가로선을 긋고 오른쪽 끝에서 아래로 꺾어 내리기',
      ),
      line('r-2', 2, [40, 54], [96, 54], '가운데 가로선을 왼쪽에서 오른쪽으로 긋기'),
      pathStroke(
        'r-3',
        3,
        'M 24 54 L 24 82 L 96 82',
        [24, 54],
        [96, 82],
        '왼쪽 세로선을 아래로 내린 뒤 아랫가로선으로 이어 쓰기',
      ),
    ],
  ),
  makeItem(
    'ㅁ',
    '미음',
    'consonant',
    '왼쪽 세로선으로 시작해 사각형 틀을 닫습니다.',
    '마',
    [
      line('m-1', 1, [28, 24], [28, 98], '왼쪽에서 위에서 아래로 내리기'),
      line('m-2', 2, [28, 24], [92, 24], '윗가로선을 긋기'),
      line('m-3', 3, [92, 24], [92, 98], '오른쪽 세로선을 내리기'),
      line('m-4', 4, [28, 98], [92, 98], '아랫가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅂ',
    '비읍',
    'consonant',
    '왼쪽 세로선과 오른쪽 세로선을 먼저 쓴 뒤, 가운데 가로선과 아랫가로선을 더합니다.',
    '바',
    [
      line('b-1', 1, [26, 24], [26, 98], '왼쪽 세로선을 내리기'),
      line('b-2', 2, [92, 24], [92, 98], '오른쪽 세로선을 내리기'),
      line('b-3', 3, [26, 62], [92, 62], '가운데 가로선을 긋기'),
      line('b-4', 4, [26, 98], [92, 98], '아랫가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅅ',
    '시옷',
    'consonant',
    '가운데 꼭짓점에서 왼쪽 대각선, 오른쪽 대각선 순서로 씁니다.',
    '사',
    [
      line('s-1', 1, [58, 24], [30, 94], '왼쪽 아래로 내려가는 대각선을 긋기'),
      line('s-2', 2, [58, 24], [86, 94], '오른쪽 아래로 내려가는 대각선을 긋기'),
    ],
  ),
  makeItem(
    'ㅇ',
    '이응',
    'consonant',
    '위쪽에서 시작해 둥글게 한 바퀴 돌며 닫습니다.',
    '아',
    [circle('ieung-1', 1, [58, 60], 34, '윗부분에서 시작해 둥글게 한 바퀴 돌기')],
  ),
  makeItem(
    'ㅈ',
    '지읒',
    'consonant',
    '윗가로선을 먼저 긋고 아래에 시옷 모양을 붙입니다.',
    '자',
    [
      line('j-1', 1, [24, 26], [92, 26], '윗가로선을 긋기'),
      line('j-2', 2, [58, 44], [30, 96], '왼쪽 아래로 대각선을 긋기'),
      line('j-3', 3, [58, 44], [86, 96], '오른쪽 아래로 대각선을 긋기'),
    ],
  ),
  makeItem(
    'ㅊ',
    '치읓',
    'consonant',
    '짧은 가로선을 맨 위에 더한 뒤 지읒처럼 씁니다.',
    '차',
    [
      line('ch-1', 1, [38, 16], [78, 16], '짧은 윗가로선을 긋기'),
      line('ch-2', 2, [24, 34], [92, 34], '가운데 가로선을 긋기'),
      line('ch-3', 3, [58, 50], [30, 100], '왼쪽 아래로 대각선을 긋기'),
      line('ch-4', 4, [58, 50], [86, 100], '오른쪽 아래로 대각선을 긋기'),
    ],
  ),
  makeItem(
    'ㅋ',
    '키읔',
    'consonant',
    '윗가로선을 먼저 긋고 오른쪽을 내려온 뒤 가운데 가로선을 붙입니다.',
    '카',
    [
      line('k-1', 1, [24, 26], [92, 26], '윗가로선을 긋기'),
      line('k-2', 2, [92, 26], [92, 100], '오른쪽 세로선을 내리기'),
      line('k-3', 3, [24, 64], [92, 64], '가운데 가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅌ',
    '티읕',
    'consonant',
    '디귿을 먼저 만든 뒤 가운데 가로선을 하나 더 넣습니다.',
    '타',
    [
      line('t-1', 1, [24, 24], [96, 24], '윗가로선을 긋기'),
      line('t-2', 2, [24, 24], [24, 96], '왼쪽 세로선을 내리기'),
      line('t-3', 3, [24, 60], [90, 60], '가운데 가로선을 긋기'),
      line('t-4', 4, [24, 96], [96, 96], '아랫가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅍ',
    '피읖',
    'consonant',
    '윗가로선을 먼저 긋고 안쪽 세로선 두 개를 내린 뒤 아랫가로선을 긋습니다.',
    '파',
    [
      line('p-1', 1, [24, 24], [96, 24], '윗가로선을 긋기'),
      line('p-2', 2, [42, 24], [42, 96], '왼쪽 안쪽 세로선을 내리기'),
      line('p-3', 3, [78, 24], [78, 96], '오른쪽 안쪽 세로선을 내리기'),
      line('p-4', 4, [24, 96], [96, 96], '아랫가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅎ',
    '히읗',
    'consonant',
    '짧은 윗가로선을 긋고 가운데 가로선을 더한 뒤 아래에 원을 그립니다.',
    '하',
    [
      line('h-1', 1, [34, 20], [82, 20], '윗가로선을 긋기'),
      line('h-2', 2, [28, 48], [88, 48], '가운데 가로선을 긋기'),
      circle('h-3', 3, [58, 82], 18, '아래 원을 둥글게 그리기'),
    ],
  ),
  makeItem(
    'ㅏ',
    '아',
    'vowel',
    '세로선을 먼저 쓰고 오른쪽 짧은 가로선을 붙입니다.',
    '가',
    [
      line('a-1', 1, [52, 16], [52, 104], '세로선을 위에서 아래로 내리기'),
      line('a-2', 2, [52, 46], [96, 46], '오른쪽으로 짧은 가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅑ',
    '야',
    'vowel',
    '세로선을 먼저 쓰고 오른쪽 짧은 가로선을 위아래로 두 번 붙입니다.',
    '야',
    [
      line('ya-1', 1, [52, 16], [52, 104], '세로선을 위에서 아래로 내리기'),
      line('ya-2', 2, [52, 38], [96, 38], '윗부분 오른쪽 가로선을 긋기'),
      line('ya-3', 3, [52, 60], [96, 60], '아랫부분 오른쪽 가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅓ',
    '어',
    'vowel',
    '세로선을 먼저 쓰고 왼쪽 짧은 가로선을 붙입니다.',
    '너',
    [
      line('eo-1', 1, [64, 16], [64, 104], '세로선을 위에서 아래로 내리기'),
      line('eo-2', 2, [18, 46], [64, 46], '왼쪽으로 짧은 가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅕ',
    '여',
    'vowel',
    '세로선을 먼저 쓰고 왼쪽 짧은 가로선을 두 번 붙입니다.',
    '여',
    [
      line('yeo-1', 1, [64, 16], [64, 104], '세로선을 위에서 아래로 내리기'),
      line('yeo-2', 2, [18, 38], [64, 38], '윗부분 왼쪽 가로선을 긋기'),
      line('yeo-3', 3, [18, 60], [64, 60], '아랫부분 왼쪽 가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅗ',
    '오',
    'vowel',
    '짧은 세로선을 먼저 내리고 아래 가로선을 왼쪽에서 오른쪽으로 긋습니다.',
    '오',
    [
      line('o-1', 1, [60, 18], [60, 52], '가운데 짧은 세로선을 위에서 아래로 내리기'),
      line('o-2', 2, [20, 52], [100, 52], '아래 가로선을 왼쪽에서 오른쪽으로 긋기'),
    ],
  ),
  makeItem(
    'ㅛ',
    '요',
    'vowel',
    '윗부분 짧은 세로선 두 개를 쓴 뒤 아래 가로선을 긋습니다.',
    '요',
    [
      line('yo-1', 1, [42, 16], [42, 48], '왼쪽 짧은 세로선을 내리기'),
      line('yo-2', 2, [78, 16], [78, 48], '오른쪽 짧은 세로선을 내리기'),
      line('yo-3', 3, [20, 58], [100, 58], '아래 가로선을 긋기'),
    ],
  ),
  makeItem(
    'ㅜ',
    '우',
    'vowel',
    '가로선을 먼저 긋고 가운데에서 세로선을 아래로 내립니다.',
    '우',
    [
      line('u-1', 1, [20, 72], [100, 72], '가로선을 왼쪽에서 오른쪽으로 긋기'),
      line('u-2', 2, [60, 20], [60, 72], '가운데 세로선을 아래로 내리기'),
    ],
  ),
  makeItem(
    'ㅠ',
    '유',
    'vowel',
    '짧은 세로선 두 개를 먼저 쓰고 아래 가로선을 마지막에 긋습니다.',
    '유',
    [
      line('yu-1', 1, [42, 18], [42, 50], '왼쪽 짧은 세로선을 위에서 아래로 내리기'),
      line('yu-2', 2, [78, 18], [78, 50], '오른쪽 짧은 세로선을 위에서 아래로 내리기'),
      line('yu-3', 3, [20, 58], [100, 58], '아래 가로선을 왼쪽에서 오른쪽으로 긋기'),
    ],
  ),
  makeItem(
    'ㅡ',
    '으',
    'vowel',
    '가로선 하나를 길게 긋습니다.',
    '으',
    [line('eu-1', 1, [18, 60], [102, 60], '가로선을 왼쪽에서 오른쪽으로 긋기')],
  ),
  makeItem(
    'ㅣ',
    '이',
    'vowel',
    '세로선 하나를 위에서 아래로 곧게 내립니다.',
    '이',
    [line('i-1', 1, [60, 16], [60, 104], '세로선을 위에서 아래로 내리기')],
  ),
];

const validationById: Record<string, JamoValidation> = {
  ㄱ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 2획 순서를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons giyeok stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%84%B1_(giyeok)_stroke_order.png'),
  ]),
  ㄴ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 2획 순서를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons nieun stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%84%B4_(nieun)_stroke_order.png'),
  ]),
  ㄷ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 3획 순서를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons digeut stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%84%B7_(digeut)_stroke_order.png'),
  ]),
  ㄹ: review('confirmed', '교재와 Wikimedia 획순 자료 모두 3획이며 마지막 획을 세로+아랫가로 연결획으로 읽을 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons rieul stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%84%B9_(rieul)_stroke_order.png'),
  ]),
  ㅁ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 4획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons mieum stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%81_(mieum)_stroke_order.png'),
  ]),
  ㅂ: review('confirmed', '교재 확대본 기준으로 4획이며, 좌우 세로선 후 가운데 가로선과 아랫가로선 순서로 확인됨', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons bieup stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%82_(bieup)_stroke_order.png'),
  ]),
  ㅅ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 2획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons siot stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%85_(siot)_stroke_order.png'),
  ]),
  ㅇ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 원형 단획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons ieung stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%87_(ieung)_stroke_order.png'),
  ]),
  ㅈ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 3획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons jieut stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%88_(jieut)_stroke_order.png'),
  ]),
  ㅊ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 4획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons chieut stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%8A_(chieut)_stroke_order.png'),
  ]),
  ㅋ: review('confirmed', '교재와 Wikimedia 이미지 모두 윗가로, 오른쪽 세로, 가운데 가로 순서를 가리킴', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons kieuk stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%8B_(kieuk)_stroke_order.png'),
  ]),
  ㅌ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 4획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons tieut stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%8C_(tieut)_stroke_order.png'),
  ]),
  ㅍ: review('confirmed', '교재와 Wikimedia 이미지 모두 윗가로, 안쪽 세로 2개, 아랫가로 구조로 일치함', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons pieup stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%8D_(pieup)_stroke_order.png'),
  ]),
  ㅎ: review('confirmed', '교재와 Wikimedia 이미지 모두 윗가로, 가운데 가로, 아래 원 순서로 일치함', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons hieut stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%8E_(hieut)_stroke_order.png'),
  ]),
  ㅏ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 2획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons a stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%8F_(a)_stroke_order.png'),
  ]),
  ㅑ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 3획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons ya stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%91_(ya)_stroke_order.png'),
  ]),
  ㅓ: review('confirmed', '교재와 Wikimedia 이미지 모두 세로 후 왼쪽 가로 순서로 일치함', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons eo stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%93_(eo)_stroke_order.png'),
  ]),
  ㅕ: review('confirmed', '교재 확대본과 Wikimedia 파일 페이지 모두 세로 후 왼쪽 가로 2개 구조를 가리킴', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons yeo stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%95_(yeo)_stroke_order.png'),
  ]),
  ㅗ: review('confirmed', '교재와 Wikimedia 이미지 모두 세로 후 아래 가로 순서로 일치함', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons o stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%97_(o)_stroke_order.png'),
  ]),
  ㅛ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 3획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons yo stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%9B_(yo)_stroke_order.png'),
  ]),
  ㅜ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 현재 2획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons u stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%9C_(u)_stroke_order.png'),
  ]),
  ㅠ: review('confirmed', '교재 확대본과 Wikimedia 파일 페이지 모두 짧은 세로 2개 후 아래 가로 구조를 가리킴', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons yu stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%A0_(yu)_stroke_order.png'),
  ]),
  ㅡ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 단일 가로획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons eu stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%A1_(eu)_stroke_order.png'),
  ]),
  ㅣ: review('confirmed', '교재와 Wikimedia 파일 페이지 기준으로 단일 세로획 구조를 유지할 수 있음', [
    source('사회통합프로그램 한글 자모음 교재', 'workbook'),
    source('Wikimedia Commons i stroke order', 'web', 'https://commons.wikimedia.org/wiki/File:%E3%85%A3_(i)_stroke_order.png'),
  ]),
};

const exampleWordsById: Record<string, ExampleWord[]> = {
  ㄱ: words(
    { id: 'g-bag', word: '가방', gloss: 'bag', difficulty: 'starter', highlightJamo: 'ㄱ' },
    { id: 'g-meat', word: '고기', gloss: 'meat', difficulty: 'basic', highlightJamo: 'ㄱ' },
  ),
  ㄴ: words(
    { id: 'n-tree', word: '나무', gloss: 'tree', difficulty: 'starter', highlightJamo: 'ㄴ' },
    { id: 'n-note', word: '노트', gloss: 'notebook', difficulty: 'basic', highlightJamo: 'ㄴ' },
  ),
  ㄷ: words(
    { id: 'd-moon', word: '달', gloss: 'moon', difficulty: 'starter', highlightJamo: 'ㄷ' },
    { id: 'd-tofu', word: '두부', gloss: 'tofu', difficulty: 'basic', highlightJamo: 'ㄷ' },
  ),
  ㄹ: words(
    { id: 'r-ramen', word: '라면', gloss: 'ramen', difficulty: 'starter', highlightJamo: 'ㄹ' },
    { id: 'r-sand', word: '모래', gloss: 'sand', difficulty: 'basic', highlightJamo: 'ㄹ' },
  ),
  ㅁ: words(
    { id: 'm-head', word: '머리', gloss: 'head', difficulty: 'starter', highlightJamo: 'ㅁ' },
    { id: 'm-hat', word: '모자', gloss: 'hat', difficulty: 'starter', highlightJamo: 'ㅁ' },
  ),
  ㅂ: words(
    { id: 'b-sea', word: '바다', gloss: 'sea', difficulty: 'starter', highlightJamo: 'ㅂ' },
    { id: 'b-pants', word: '바지', gloss: 'pants', difficulty: 'basic', highlightJamo: 'ㅂ' },
  ),
  ㅅ: words(
    { id: 's-apple', word: '사과', gloss: 'apple', difficulty: 'starter', highlightJamo: 'ㅅ' },
    { id: 's-watermelon', word: '수박', gloss: 'watermelon', difficulty: 'basic', highlightJamo: 'ㅅ' },
  ),
  ㅇ: words(
    { id: 'ieung-child', word: '아이', gloss: 'child', difficulty: 'starter', highlightJamo: 'ㅇ' },
    { id: 'ieung-cucumber', word: '오이', gloss: 'cucumber', difficulty: 'starter', highlightJamo: 'ㅇ' },
  ),
  ㅈ: words(
    { id: 'j-seat', word: '자리', gloss: 'seat', difficulty: 'starter', highlightJamo: 'ㅈ' },
    { id: 'j-house', word: '집', gloss: 'house', difficulty: 'basic', highlightJamo: 'ㅈ' },
  ),
  ㅊ: words(
    { id: 'ch-toothpaste', word: '치약', gloss: 'toothpaste', difficulty: 'starter', highlightJamo: 'ㅊ' },
    { id: 'ch-skirt', word: '치마', gloss: 'skirt', difficulty: 'basic', highlightJamo: 'ㅊ' },
  ),
  ㅋ: words(
    { id: 'k-nose', word: '코', gloss: 'nose', difficulty: 'starter', highlightJamo: 'ㅋ' },
    { id: 'k-knife', word: '칼', gloss: 'knife', difficulty: 'basic', highlightJamo: 'ㅋ' },
  ),
  ㅌ: words(
    { id: 't-rabbit', word: '토끼', gloss: 'rabbit', difficulty: 'starter', highlightJamo: 'ㅌ' },
    { id: 't-sun', word: '태양', gloss: 'sun', difficulty: 'basic', highlightJamo: 'ㅌ' },
  ),
  ㅍ: words(
    { id: 'p-grape', word: '포도', gloss: 'grape', difficulty: 'starter', highlightJamo: 'ㅍ' },
    { id: 'p-grass', word: '풀', gloss: 'grass', difficulty: 'basic', highlightJamo: 'ㅍ' },
  ),
  ㅎ: words(
    { id: 'h-hippo', word: '하마', gloss: 'hippo', difficulty: 'starter', highlightJamo: 'ㅎ' },
    { id: 'h-tissue', word: '휴지', gloss: 'tissue', difficulty: 'basic', highlightJamo: 'ㅎ' },
  ),
  ㅏ: words(
    { id: 'a-baby', word: '아기', gloss: 'baby', difficulty: 'starter', highlightJamo: 'ㅏ' },
    { id: 'a-bag', word: '가방', gloss: 'bag', difficulty: 'starter', highlightJamo: 'ㅏ' },
  ),
  ㅑ: words(
    { id: 'ya-baseball', word: '야구', gloss: 'baseball', difficulty: 'starter', highlightJamo: 'ㅑ' },
    { id: 'ya-socks', word: '양말', gloss: 'socks', difficulty: 'basic', highlightJamo: 'ㅑ' },
  ),
  ㅓ: words(
    { id: 'eo-bus', word: '버스', gloss: 'bus', difficulty: 'starter', highlightJamo: 'ㅓ' },
    { id: 'eo-mother', word: '어머니', gloss: 'mother', difficulty: 'basic', highlightJamo: 'ㅓ' },
  ),
  ㅕ: words(
    { id: 'yeo-fox', word: '여우', gloss: 'fox', difficulty: 'starter', highlightJamo: 'ㅕ' },
    { id: 'yeo-winter', word: '겨울', gloss: 'winter', difficulty: 'basic', highlightJamo: 'ㅕ' },
  ),
  ㅗ: words(
    { id: 'o-cucumber', word: '오이', gloss: 'cucumber', difficulty: 'starter', highlightJamo: 'ㅗ' },
    { id: 'o-grape', word: '포도', gloss: 'grape', difficulty: 'starter', highlightJamo: 'ㅗ' },
  ),
  ㅛ: words(
    { id: 'yo-cooking', word: '요리', gloss: 'cooking', difficulty: 'starter', highlightJamo: 'ㅛ' },
    { id: 'yo-yo', word: '요요', gloss: 'yo-yo', difficulty: 'basic', highlightJamo: 'ㅛ' },
  ),
  ㅜ: words(
    { id: 'u-milk', word: '우유', gloss: 'milk', difficulty: 'starter', highlightJamo: 'ㅜ' },
    { id: 'u-shoes', word: '구두', gloss: 'shoes', difficulty: 'basic', highlightJamo: 'ㅜ' },
  ),
  ㅠ: words(
    { id: 'yu-glass', word: '유리', gloss: 'glass', difficulty: 'starter', highlightJamo: 'ㅠ' },
    { id: 'yu-tissue', word: '휴지', gloss: 'tissue', difficulty: 'basic', highlightJamo: 'ㅠ' },
  ),
  ㅡ: words(
    { id: 'eu-picture', word: '그림', gloss: 'picture', difficulty: 'starter', highlightJamo: 'ㅡ' },
    { id: 'eu-swing', word: '그네', gloss: 'swing', difficulty: 'basic', highlightJamo: 'ㅡ' },
  ),
  ㅣ: words(
    { id: 'i-blanket', word: '이불', gloss: 'blanket', difficulty: 'starter', highlightJamo: 'ㅣ' },
    { id: 'i-train', word: '기차', gloss: 'train', difficulty: 'basic', highlightJamo: 'ㅣ' },
  ),
};

export const jamoItems: JamoItem[] = baseJamoItems.map((item) => ({
  ...item,
  examples: exampleWordsById[item.id] ?? [],
  validation: validationById[item.id],
}));

export const groupMeta = {
  consonant: {
    label: '기본 자음 14',
    subtitle: '받침과 음절 블록의 뼈대를 만드는 소리',
  },
  vowel: {
    label: '기본 모음 10',
    subtitle: '소리를 길과 방향으로 이어 주는 모양',
  },
} as const;
