# CareerNote 디자인 시스템 — AI 에이전트 규칙

이 레포는 CareerNote 전 프로젝트(careernote-web, career-pencil, 신규 프로젝트)의 **스타일 단일 정본**이다.
AI 에이전트로 프론트엔드 코드를 작성할 때 아래 규칙을 따른다.
상세 플레이북(작업 유형별 절차·실패 사례·검증 루프): [docs/agentic-coding-guide.md](./docs/agentic-coding-guide.md)

## 컴포넌트 신설 규칙 (React + Vue 패리티 필수)

이 레포에 컴포넌트를 새로 만들 때는 **React와 Vue를 동시에** 만든다. 완료 조건은 아래 4개 전부다.

| # | 산출물 | 위치 |
|---|---|---|
| 1 | React 구현 + 배럴 export | `packages/react/src/<group>/` → `src/index.ts` |
| 2 | **Vue 구현 (동일 스펙)** + 배럴 export | `packages/vue/src/<group>/` → `src/index.ts` |
| 3 | React 카탈로그 데모 | `apps/catalog/` 해당 탭 |
| 4 | Vue 카탈로그 데모 | `apps/catalog-vue/` 해당 탭 |

- **React만 만들고 끝내지 않는다.** careernote-web(React)과 career-pencil(Vue)이 같은 디자인 언어를 공유하는 것이 이 레포의 존재 이유다. 한쪽만 만들면 다른 쪽이 같은 것을 또 만들고 두 구현이 갈라진다.
- 한쪽만 만들어야 할 합당한 이유가 있으면(프레임워크 고유 API 의존 등) **사유를 컴포넌트 주석에 남긴다.**
- 데모 없는 승격은 미완료다 — 다음 사람이 존재를 모른다.
- 스타일은 **props 로 variant 를 노출**한다. `className` 하드코딩 + `{...rest}` spread 조합은 소비처에서 className 이 병합되지 않고 교체되어 재사용이 불가능해진다. (`TextLink` 가 실제로 이 문제를 갖고 있다)

## 절대 규칙

1. **hex 색상을 직접 쓰지 않는다.** 색은 반드시 `@careernote/tokens`의 토큰 이름으로 쓴다.
   - ❌ `text-[#4B4D57]`, `color: #00A3FF`
   - ✅ `text-gray800`, `text-sky` (Tailwind), `var(--cn-color-sky)` (플레인 CSS)
2. **Tailwind 기본 팔레트 그레이를 쓰지 않는다.** `#E5E7EB`, `#6B7280` 같은 복붙 스니펫 색은 전부 토큰으로 치환한다.
   - 대응표: `#E5E7EB`→`border_gray`, `#6B7280`→`gray700`, `#111827`/`#1F2937`→`gray900`, `#9CA3AF`→`gray600`, `#F3F4F6`→`bg_gray1`
3. **새 색이 필요하면 토큰부터 추가한다.** `packages/tokens/src/tokens.json` 수정 → `bun run build:tokens` → dist 커밋. 앱 코드에 리터럴을 넣지 않는다.
4. **React 프로젝트에서 새 버튼/칩/인풋을 만들기 전에 `@careernote/react`에 있는지 먼저 확인한다.** (아래 인벤토리)

## 토큰 소비 방법

| 소비처 | 방법 |
|---|---|
| Tailwind 3 (careernote-web) | `tailwind.config.ts`에 `presets: [require('@careernote/tokens/tailwind-v3-preset')]` |
| Tailwind 4 (career-pencil) | CSS에서 `@import '@careernote/tokens/theme-v4.css';` |
| 플레인 CSS/기타 | `@import '@careernote/tokens/tokens.css';` → `var(--cn-color-*)` |
| JS/TS | `import tokens from '@careernote/tokens/tokens.json'` |

주의: breakpoint 는 `theme-v4.css`에서 의도적으로 제외한다 (career-pencil 은 자체 `@custom-variant` 보유).

## Spacing 규칙 (2026-08-07 표준 복원)

- **spacing 은 표준 Tailwind 스케일만 쓴다** (1키 = 0.25rem = 4px): `gap-1`=4px, `p-4`=16px, `py-3.5`=14px.
- config 에서 spacing 을 px 로 오버라이드하지 않는다 (`4: '4px'` 식 매핑 금지 — 과거 careernote-web 의 실수).
- `gap-[4px]` 같은 arbitrary px 값도 표준 키가 있으면 쓰지 않는다: `gap-[4px]`→`gap-1`, `w-[32px]`→`w-8`.
- 표준 키가 없는 값(60px, 홀수 px 등)만 arbitrary 유지: `mt-[60px]`.

## 컴포넌트 인벤토리 (@careernote/react)

**CareerNote 프리미티브** (`@careernote/react` 메인 배럴):
- buttons: `Button`(5 color × 3 size), `ToggleButton`
- inputs: `TextInput`, `Textarea`, `Selector`
- display: `Chip`(7 color × 4 size × 2 variant), `ProChip`, `TemplateChips`, `Icon`, `Tooltip`, `Information`, `NumberBadge`
- feedback: `Alert`, `Snackbar`(notistack 필요)
- overlays: `Modal`
- navigation: `SubHeader`, `InHeader`, `ProgressBarItem`, `HeaderMenuItem`

**아이콘**:
- `iconMap` 109종 — `<Icon name="..." />` 로 사용 (개별 named export 는 그중 53종만)
- `@careernote/react/icons-extra` 17종 — design-system 밖 `src/icons` 이관분

전체 시각 카탈로그: `bun install && bun run catalog` → http://localhost:5190

## career-pencil(Vue) 주의사항

- 컴포넌트는 React라 직접 못 쓴다 — **토큰만 소비**하고, Vue 구현은 카탈로그의 시각 스펙과 일치시킨다.
- career-pencil의 시멘틱 토큰(`--color-surface` 등)은 **에디터 앱 전용 테마**로 이 레포와 별개다. `surface`는 텍스트 색이다(배경 아님).

## 유지보수

- 토큰 수정: `packages/tokens/src/tokens.json` → `bun run build:tokens` → dist 포함 커밋 → git tag 버전 업
- 소비 레포 업데이트: package.json의 `#vX.Y.Z` tag 갱신 후 install
