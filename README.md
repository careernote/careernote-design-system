# careernote-design-system

CareerNote 디자인 시스템 모노레포 — 토큰 정본 + React 컴포넌트 + 시각 카탈로그.

## 구성

| 패키지 | 내용 |
|---|---|
| `packages/tokens` (`@careernote/tokens`) | 디자인 토큰 정본(`src/tokens.json`) + 생성물: `tokens.css`(CSS 변수) · `tailwind-v3-preset`(careernote-web) · `theme-v4.css`(career-pencil) |
| `packages/react` (`@careernote/react`) | careernote-web 이관 React 컴포넌트 — 프리미티브 22종 + shadcn 레이어 18종(`/ui`) + 아이콘 109종(iconMap) + 보조 아이콘 17종(`/icons-extra`) |
| `apps/catalog` | 전 컴포넌트·토큰 시각 카탈로그 (Vite) |

## 빠른 시작

```bash
bun install
bun run catalog          # 카탈로그 → http://localhost:5190
bun run build:tokens     # tokens.json 수정 후 dist 재생성
```

## 다른 레포에서 설치 (git dependency)

```json
"dependencies": {
  "@careernote/tokens": "github:careernote/careernote-design-system#v0.1.0&path:packages/tokens"
}
```

또는 레포 전체를 받아 workspace 패키지로 참조. 소비 방법 상세는 [AGENTS.md](./AGENTS.md) 참조.

## 버전 규칙

- 토큰/컴포넌트 수정 → PR → 머지 후 git tag (`v0.2.0` 등)
- 소비 레포는 tag 고정으로 설치 — 토큰 레포 변경이 앱에 몰래 반영되지 않는다

## AI 에이전트

에이전트로 프론트 작업 시 [AGENTS.md](./AGENTS.md)의 규칙(hex 직접 입력 금지, 토큰 이름 사용, 컴포넌트 재사용)을 따를 것.
