# CareerNote 디자인 시스템 — AI 에이전트 규칙

이 레포는 CareerNote 전 프로젝트(careernote-web, career-pencil, 신규 프로젝트)의 **스타일 단일 정본**이다.
AI 에이전트로 프론트엔드 코드를 작성할 때 아래 규칙을 따른다.

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

주의: `theme-v4.css`는 **spacing·breakpoint를 의도적으로 제외**한다 (career-pencil은 기본 rem 스케일과 자체 `@custom-variant`를 사용).

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
