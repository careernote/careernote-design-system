# @careernote/assets

## 브랜드 로고

CareerNote 로고 정본. **도형·텍스트로 다시 그리지 말고 이 파일을 쓴다.** 비율 고정, 색 변경 금지.

| 파일 | 크기 | 용도 |
|---|---|---|
| `logo/careernote-symbol.svg` | 32×32 (벡터) | **기본 로고.** 아이콘 단독(심볼). 앱 아이콘·파비콘·좁은 자리 |
| `logo/careernote-symbol.png` | 512×512 | 심볼 래스터 (벡터를 못 쓰는 곳) |
| `logo/careernote-logo.png` | 283×34 | 가로형(심볼+워드마크). 밝은 배경 헤더·문서 |
| `logo/careernote-logo-on-dark.png` | 377×45 | 가로형, 어두운 배경용(흰 글자) |
| `logo/*.base64.json` | — | 파일 접근이 없는 환경(캔버스 엔진·헤드리스)에서 쓰는 base64 사본 |

기본은 **심볼**입니다. 이름을 함께 보여야 하는 자리에서만 가로형을 씁니다.

```ts
import symbol from '@careernote/assets/logo/careernote-symbol.svg'   // 기본
import logo from '@careernote/assets/logo/careernote-logo.png'       // 가로형
import symbolData from '@careernote/assets/logo/careernote-symbol.base64.json' // { width, height, mime, base64 }
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
