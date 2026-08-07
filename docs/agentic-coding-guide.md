# Agentic Coding 가이드 — CareerNote 디자인 시스템

AI 에이전트(Claude Code, Codex 등)로 CareerNote 프론트엔드를 작업할 때의 실전 플레이북.
짧은 규칙 요약은 [AGENTS.md](../AGENTS.md)에 있고, 이 문서는 **왜·어떻게**를 다룬다.

> 카탈로그(시각 정본): `bun run catalog` → http://localhost:5190

---

## 1. 왜 이 체계가 필요한가

에이전트 코딩에서 스타일 드리프트가 생기는 원인은 단 하나다: **레포 안에 참조할 정본이 없으면 에이전트는 색과 간격을 지어낸다.**

실제로 이 체계를 만들기 전 상태:

| 증상 | 규모 | 원인 |
|---|---|---|
| 하드코딩 hex | career-pencil에 1,276개 (고유 196개) | 토큰 이름표가 컨텍스트에 없음 |
| Tailwind 기본 그레이 유입 | `#E5E7EB` 59회 등 | 웹 복붙 스니펫 색을 그대로 둠 |
| 같은 컴포넌트 두 벌 | web `Chip` 56조합 vs pencil `Chip` 6조합 | 시각 스펙 공유 없이 손 이식 |
| spacing 의미 붕괴 | `gap-4`가 4px (표준은 16px) | config px 오버라이드 → 에이전트 지식과 충돌 |

마지막 항목이 특히 치명적이다. 에이전트는 표준 Tailwind(`gap-4`=1rem)를 학습한 상태라, px 오버라이드 환경에서는 **에이전트가 아는 것과 렌더 결과가 4배 어긋난다.** 2026-08-07에 표준으로 복원했다 (frontend `18b93d8`).

## 2. 세팅 — 각 레포에 넣을 것

에이전트가 매 세션 규칙을 보려면 각 레포의 CLAUDE.md(또는 AGENTS.md)에 아래 블록을 넣는다.

**careernote-web (React, Tailwind 3):**

```markdown
## 디자인 시스템 (필수)
- 스타일 정본: careernote-design-system 레포 (@careernote/tokens + @careernote/react)
- 색상은 토큰 클래스만 사용 (text-gray800, bg-sky 등). hex 직접 입력 금지.
- spacing은 표준 Tailwind 스케일 (gap-1=4px, p-4=16px). px 오버라이드·arbitrary px 금지.
- 새 버튼/칩/인풋을 만들기 전에 @careernote/react 인벤토리 확인.
- 규칙 전문: careernote-design-system/AGENTS.md
```

**career-pencil (Vue, Tailwind 4):**

```markdown
## 디자인 시스템 (필수)
- 브랜드 색은 @careernote/tokens의 theme-v4.css 토큰 사용 (text-gray800, bg-sky 등). hex 직접 입력 금지.
- 단, 에디터 시멘틱 토큰(canvas/panel/surface/muted/accent)은 별개 체계 — surface는 텍스트 색.
- Vue 컴포넌트는 React를 직접 못 쓰므로, 카탈로그(localhost:5190)의 시각 스펙과 일치시킨다.
- 규칙 전문: careernote-design-system/AGENTS.md
```

## 3. 작업 유형별 플레이북

### A. 새 UI 화면/컴포넌트 만들기

1. **인벤토리 먼저**: `@careernote/react` 배럴(또는 카탈로그)에서 기존 프리미티브 확인. 있으면 만들지 말고 import.
2. 색이 필요하면 `tokens.json`에서 이름 찾기 — 못 찾으면 §C(새 토큰 추가)로.
3. 간격은 표준 스케일: 디자인이 12px이면 `gap-3`, 14px이면 `gap-3.5`. 스케일 밖 값(예: 60px)만 `[60px]`.
4. 아이콘은 `<Icon name="..." />` (109종) → 없으면 `icons-extra`(17종) → 그래도 없으면 신규 추가(§D).

### B. 기존 UI 수정

- **수정 대상 파일의 기존 표기법을 따르되, hex·arbitrary px를 발견하면 그 줄에 한해 토큰으로 치환**한다 (주변 코드 대청소 금지 — diff는 요청 범위만).
- before 캡처 → 수정 → after 캡처 → A/B 리포트로 승인받는 워크플로 유지.

### C. 새 색/토큰 추가

1. `packages/tokens/src/tokens.json`의 알맞은 그룹(brand/gray/semantic/...)에 추가
2. `bun run build:tokens` → dist 3종 재생성 (자동 생성물, 직접 수정 금지)
3. dist 포함 커밋 → tag 버전 업 → 소비 레포 tag 갱신
4. 앱 코드에 hex 리터럴을 먼저 넣고 "나중에 토큰화"하지 않는다 — 그 "나중"은 오지 않는다

### D. 새 컴포넌트/아이콘 추가

1. `packages/react/src/<분류>/`에 구현 — 색은 토큰 클래스, 간격은 표준 스케일
2. **배럴(index.ts)에 export 추가** — 과거 이 레포엔 "파일은 있는데 export 안 된 유령 아이콘"이 10개 있었다. export 안 하면 없는 것과 같다
3. 아이콘은 `icons/index.ts`의 `iconMap`에도 등록 (`<Icon name>` API가 정본)
4. 카탈로그(`apps/catalog`)에 해당 섹션이 자동 반영되는지 확인 — iconMap·배럴 기반 그리드는 자동, 신규 분류면 섹션 추가

### E. 대량 리팩터 (클래스 일괄 치환 등)

- 치환 스크립트는 **dry-run 먼저**, 출력 키가 입력 키와 겹치면 비멱등이므로 **재실행 금지** 명시
- 시각 무영향 주장은 증명하라: 정적 페이지 픽셀 diff + 애니메이션 페이지는 "동일 코드 재캡처 노이즈 베이스라인"과 비교
- 프로덕션 빌드 통과 확인 후 커밋

## 4. 검증 루프

| 검증 | 방법 |
|---|---|
| 토큰이 실제 적용되는가 | 카탈로그 자체가 preset 소비자 — 토큰이 깨지면 카탈로그가 먼저 깨진다 |
| 컴포넌트 시각 스펙 | 카탈로그 해당 탭과 비교 (Vue 재구현 시 특히) |
| UI 변경 | before/after 캡처 → A/B HTML 리포트 → 승인 후 커밋 |
| 빌드 | 소비 레포에서 프로덕션 빌드 1회 |

## 5. 흔한 실패 모드 (실제 사례)

1. **복붙 스니펫의 Tailwind 기본 그레이** — 에이전트가 웹 예제를 가져오면 `#E5E7EB`·`gray-500` 계열이 딸려온다. 대응표로 즉시 치환: `#E5E7EB`→`border_gray`, `#6B7280`→`gray700`, `#111827`→`gray900`, `#9CA3AF`→`gray600`, `#F3F4F6`→`bg_gray1`
2. **"임시로 hex"** — 임시는 영구가 된다. 1,276개가 그렇게 쌓였다
3. **배럴 누락** — 파일 추가 후 export 누락 → 다음 에이전트가 "없네" 하고 중복 구현
4. **config 오버라이드로 문제 풀기** — spacing px 오버라이드가 남긴 교훈: 에이전트의 사전지식과 어긋나는 로컬 규칙은 부채다. 표준을 따르고, 브랜드 고유값만 토큰으로 확장한다
5. **두 앱 동시 수정 누락** — 토큰·시각 스펙 변경은 web(preset)과 pencil(theme-v4)에 같이 반영해야 한다. 한쪽만 하면 드리프트 재발

## 6. 레포 지도

```
careernote-design-system/
├── AGENTS.md                  ← 에이전트 규칙 요약 (자동 로드 대상)
├── docs/agentic-coding-guide.md  ← 이 문서
├── packages/tokens/
│   ├── src/tokens.json        ← 유일한 수정 지점 (정본)
│   ├── scripts/build.ts       ← dist 생성기
│   └── dist/                  ← tokens.css · tailwind-v3-preset.cjs · theme-v4.css (자동 생성, 커밋 대상)
├── packages/react/src/        ← 프리미티브 22종 + icons(109) + icons-extra(17)
└── apps/catalog/              ← 시각 정본 뷰어 (bun run catalog)
```
