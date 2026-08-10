# CareerNote 디자인 시스템 — 작업 지시서

> 2026-08-10 기준. 이 문서는 디자인 시스템 작업의 방향·순서·원칙의 단일 정본이다.
> 규칙 요약은 [AGENTS.md](../AGENTS.md), 실전 플레이북은 [agentic-coding-guide.md](./agentic-coding-guide.md).

## 1. 현황 (완료된 것)

| 축 | 상태 |
|---|---|
| 토큰 정본 | `packages/tokens/src/tokens.json` — 색 48종·타이포 9단계·radius·shadow·breakpoint. dist 3종 자동 생성 |
| React 패키지 | `@careernote/react` — 프리미티브 25종(Button·Chip·Badge·IconButton·AddDashedButton·ActivityCard·TextInput 확장판 등) + 아이콘 126종. 내부 hex 토큰화 완료 |
| Vue 패키지 | `@careernote/vue` — 핵심 6종 (Button·Chip·Badge·IconButton·AddDashedButton·ActivityCard). React 스펙과 클래스 동일 |
| 카탈로그 | `apps/catalog` — 라이브: https://careernote.github.io/careernote-design-system/ (main 푸시마다 자동 배포) |
| 배포 | git 의존 + `pkg/react`·`pkg/tokens`·`pkg/vue` subtree split 브랜치 (CI 자동 갱신) |
| 소비자 | careernote-web: my 전체·analysis·article·랜딩 셸·signup·v2 퍼널 전환 완료. career-pencil: tokens(theme-v4) 채택 완료 |

## 2. 작업 원칙 (모든 작업 공통)

1. **시각 무영향이 기본값** — 값-동일 토큰 치환·import 리다이렉트가 1순위. 시각이 바뀌는 규격 수렴은 커밋 메시지에 델타 명시.
2. **토큰 먼저** — 새 색은 tokens.json에 먼저 추가(`bun run build:tokens` → dist 커밋). 앱에 hex 리터럴 금지.
3. **배럴은 전수 export** — "파일은 있는데 export 없음"(유령 export)이 반복 사고 원인이었다. 컴포넌트/아이콘 추가 시 배럴+iconMap+카탈로그 3종 세트.
4. **페이지(트리) 단위 커밋** — 롤백 단위 유지. 공유 파일 수정은 커밋 메시지에 누수 범위 명시.
5. **disabled 노출 CTA는 disabled 스타일까지 확인 후 스왑** — sky60 반투명이 현행 규격.
6. **React↔Vue는 클래스 스펙으로 정합** — 코드 공유 불가. 카탈로그가 스펙 정본, Vue는 동일 클래스 이식. 단 **v3(React)=언더스코어(`border_gray`), v4(Vue)=하이픈(`border-border-gray`)** 표기 차이 주의.
7. 컴포넌트 승격은 **껍데기만** — 도메인 로직·데이터 결합은 소비자에 남기고 슬롯/props 주입.

## 3. 트랙별 방향

### 트랙 A — React 패키지 확장 (careernote-web 완주용)
1. **TextInput RHF 지원**: `forwardRef` + `name`/`onBlur` 전달 + input 엘리먼트용 클래스 통로 + `animate-shake` 에러 연동 → 편집 모달·analysis input 12곳 해제 (최우선)
2. Button `sky-outline` variant → signup·비밀번호찾기 3곳
3. TextInput `lock` righticon → readOnly 필드
4. Modal 정리 — `#F0F1F6` 등 비토큰 4곳은 디자인 결정 후 (border_gray2 통일 제안)

### 트랙 B — Vue 패키지 확장 (career-pencil 정합)
1. 1차 6종 이식 완료 → **pencil 검증 라우트(`/dev/design-system`)로 시각 대조** 후 실사용 시작
2. 확장 순서: TextInput → Selector → Tooltip → Modal (pencil 커스터머 테마 화면에서 쓰는 순)
3. pencil 에디터 시멘틱 토큰(canvas/panel/surface)과 브랜드 토큰은 **별개 체계로 공존** — 에디터 크롬은 시멘틱, 커스터머 노출면은 브랜드
4. 장기: pencil 범용 컴포넌트(ResponsiveModal·DateRangePicker 등)의 역이식 여부는 실수요 생길 때 판단

### 트랙 C — 소비자 마이그레이션 잔여
1. careernote-web: 포트폴리오 생성 레거시 플로우(`pages/portfolio/**` 27파일·hex 273) — 24개 단계 페이지 병렬 분할 가능
2. 랜딩 본문 `domain/main`(styled-components 63개) — Tailwind 마이그레이션 선행 필요, 별도 승인
3. `ConfirmModal`(5페이지 공유) — 별도 승인 단위
4. web의 vendored 미러 `src/components/design-system/` — 전 소비처 패키지 전환 후 삭제 (스토리 이관 포함)

### 트랙 D — 거버넌스
1. 버전: main 안정 시점마다 git tag (`v0.x`) — 소비자 lockfile은 커밋 고정이라 tag는 문서용
2. 카탈로그 = 스펙 정본. 신규 컴포넌트는 카탈로그 등재 없이는 완료로 치지 않는다
3. Vue 컴포넌트의 카탈로그 노출(Vue 아일랜드 또는 별도 Vue 카탈로그)은 트랙 B 안정 후 검토

## 4. 결정 대기 / 보류 목록

- [ ] 트랙 A-1 TextInput RHF 확장 진행 여부 (지시만 있으면 착수 가능)
- [ ] 비토큰 색 정리: Modal `#F0F1F6`, `#999` 계열, 브랜드 그라데이션 3종 불일치
- [ ] 데드 코드 삭제 승인: `/wanted` 트리, `PromptLoadingModalLegacy`, `Header.tsx` dangling 주석 블록, job 페이지 `[테스트용]` 디버그 UI
- [ ] frontend 미푸시 커밋 push (dev 배포 트리거)
- [ ] 발견된 앱 버그: STAR 팔레트 2벌 불일치, 탈퇴 사유 textarea 미사용, BundleTicketModal 4px 스피너
