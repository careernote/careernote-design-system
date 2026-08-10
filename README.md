# careernote-design-system

CareerNote 디자인 시스템 모노레포 — 토큰 정본 + React/Vue 컴포넌트 + 시각 카탈로그.

**🔗 라이브 카탈로그: https://careernote.github.io/careernote-design-system/** (React) · **[/vue/](https://careernote.github.io/careernote-design-system/vue/)** (Vue) — main 푸시마다 자동 배포

## 구성

| 패키지 | 내용 |
|---|---|
| `packages/tokens` (`@careernote/tokens`) | 디자인 토큰 정본(`src/tokens.json`) + 생성물: `tokens.css`(CSS 변수) · `tailwind-v3-preset`(careernote-web) · `theme-v4.css`(career-pencil) |
| `packages/react` (`@careernote/react`) | careernote-web 이관 React 컴포넌트 — 프리미티브 22종 + 아이콘 109종(iconMap) + 보조 아이콘 17종(`/icons-extra`) |
| `packages/vue` (`@careernote/vue`) | career-pencil 소비용 Vue 3 컴포넌트 — SFC 18종 + 아이콘 105종(React 아이콘 자동 변환, `scripts/gen-icons.ts`) |
| `apps/catalog` | React 컴포넌트·토큰 시각 카탈로그 (Vite, Tailwind v3) |
| `apps/catalog-vue` | Vue 컴포넌트 시각 카탈로그 (Vite, Tailwind v4) — React 카탈로그와 10탭 동일 구성 |

## 빠른 시작

```bash
bun install
bun run catalog          # React 카탈로그 → http://localhost:5190
bun run catalog:vue      # Vue 카탈로그 → http://localhost:5191
bun run build:tokens     # tokens.json 수정 후 dist 재생성
```

## 다른 레포에서 설치 (git dependency)

yarn v1 은 git 의존의 하위 폴더를 못 읽으므로, main 푸시마다 CI 가 패키지별 브랜치를 자동 생성한다
(`.github/workflows/split-packages.yml` → `pkg/react`, `pkg/tokens`, `pkg/vue`).

careernote-web (yarn v1):

```json
"dependencies": {
  "@careernote/react": "https://github.com/careernote/careernote-design-system.git#pkg/react",
  "@careernote/tokens": "https://github.com/careernote/careernote-design-system.git#pkg/tokens"
}
```

career-pencil (bun):

```json
"dependencies": {
  "@careernote/tokens": "git+https://github.com/careernote/careernote-design-system.git#pkg/tokens",
  "@careernote/vue": "git+https://github.com/careernote/careernote-design-system.git#pkg/vue"
}
```

Next.js 소비자는 추가로: `next.config`에 `transpilePackages: ['@careernote/react', '@careernote/tokens']`,
tailwind `content`에 `'./node_modules/@careernote/react/src/**/*.{ts,tsx}'`.
Vue(Tailwind v4) 소비자는 앱 CSS 에 `@import '@careernote/tokens/theme-v4.css';` +
`@source "../node_modules/@careernote/vue/src/**/*.vue";` 추가. 소비 방법 상세는 [AGENTS.md](./AGENTS.md) 참조.

> 표기 주의: v3 프리셋은 언더스코어(`border_gray`), v4 테마는 하이픈(`border-border-gray`) — Vue 컴포넌트는 하이픈 표기를 쓴다.

## 버전 규칙

- 토큰/컴포넌트 수정 → PR → 머지 후 git tag (`v0.2.0` 등)
- 소비 레포는 tag 고정으로 설치 — 토큰 레포 변경이 앱에 몰래 반영되지 않는다

## AI 에이전트

에이전트로 프론트 작업 시 [AGENTS.md](./AGENTS.md)의 규칙(hex 직접 입력 금지, 토큰 이름 사용, 컴포넌트 재사용)을 따를 것.
작업 유형별 절차·실패 사례·검증 루프는 [docs/agentic-coding-guide.md](./docs/agentic-coding-guide.md), 작업 방향 지시서는 [docs/WORKPLAN.md](./docs/WORKPLAN.md) 참조.
