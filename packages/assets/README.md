# @careernote/assets

## 브랜드 로고

CareerNote 로고 정본. **도형·텍스트로 다시 그리지 말고 이 파일을 쓴다.** 비율 고정, 색 변경 금지.

| 파일 | 크기 | 용도 |
|---|---|---|
| `logo/careernote-logo.png` | 283×34 | 기본(밝은 배경). 헤더·문서·캔버스 |
| `logo/careernote-logo-on-dark.png` | 377×45 | 어두운 배경용(흰 글자) |
| `logo/*.base64.json` | — | 파일 접근이 없는 환경(캔버스 엔진·헤드리스)에서 쓰는 base64 사본 |

```ts
import logo from '@careernote/assets/logo/careernote-logo.png'
import logoData from '@careernote/assets/logo/careernote-logo.base64.json' // { width, height, mime, base64 }
```

## 로티 애니메이션

로티(JSON) 애니메이션 정본. 소비: `import anim from '@careernote/assets/lottie/LoadingDots.json'`
플레이어는 각 앱의 lottie-web(pencil) / lottie-react(web) 사용 — Vue 는 `@careernote/vue` 의 `LottieLoadingDots` 참조.

| 파일 | 용도 |
|---|---|
| LoadingDots.json | 진행중 점 3개 (프롬프트 로딩 스텝) |
| ai.json | AI 생성 연출 |
| check.json | 완료 체크 |
| search.json | 분석/검색 연출 |
| evaluation.json | 평가 연출 |
